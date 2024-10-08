import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { Room } from '../room/room.model';
import { formatTime } from './slot.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createSlotIntoDB = async (payload: TSlot) => {
  //? check --> all fields are send in payload, not empty
  //? check --> isRoomExist
  //? convert --> startTime & endTime convert to minutes & format to business logic
  //? check --> if startTime is matched with same date
  //? loop --> create slot or slots into db: depends on total duration of slot and slotDuration

  const { room, date, startTime, endTime } = payload;

  if ([room, date, startTime, endTime].some((field) => field === '')) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
  }

  const isRoomExists = await Room.findOne({ _id: payload.room });
  if (!isRoomExists) {
    throw new ApiError(httpStatus.CONFLICT, 'This room is not found!');
  }

  const existingSlot = await Slot.findOne({
    room,
    date,
    startTime: { $eq: startTime },
  });

  if (existingSlot) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'A slot with the same start time already exists for this room and date.',
    );
  }

  const slotDuration = 60;

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * slotDuration + startMinutes;
  const endTotalMinutes = endHours * slotDuration + endMinutes;
  const totalDuration = endTotalMinutes - startTotalMinutes;

  if (endTotalMinutes <= startTotalMinutes) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'End time must be after start time!',
    );
  }

  const createdSlots = [];

  let currentStartMinutes = startTotalMinutes;
  for (let i = 0; i < totalDuration / slotDuration; i++) {
    const updatedPayload = {
      ...payload,
      startTime: formatTime(currentStartMinutes),
      endTime: formatTime(currentStartMinutes + slotDuration),
    };

    currentStartMinutes = currentStartMinutes + slotDuration;

    try {
      const slot = await Slot.create(updatedPayload);
      createdSlots.push(slot);
    } catch (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong!',
      );
    }
  }

  return createdSlots;
};

const retrieveAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const availableSlotsQuery = new QueryBuilder(
    Slot.find({
      isBooked: false,
    }).populate('room'),
    query,
  ).filter();
  return await availableSlotsQuery.modelQuery;
};

//!!! TODO: I'm trying to update & optimize this service
const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  if (typeof payload !== 'object' || payload === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid update data!');
  }

  const slot = await Slot.findById(id);
  if (!slot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This Slot not found!');
  }

  const updatedPayload = { ...slot.toObject(), ...payload };

  const result = await Slot.findByIdAndUpdate(
    id,
    { ...updatedPayload },
    {
      new: true,
      runValidators: true,
    },
  );

  // console.log(updatedPayload);

  return result;
};

const deleteSlotFromDB = async (id: string) => {
  const slot = await Slot.findById(id);
  if (!slot) {
    throw new ApiError(httpStatus.CONFLICT, 'This slot does not exists!');
  }

  const result = await Slot.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  retrieveAvailableSlotsFromDB,
  updateSlotIntoDB,
  deleteSlotFromDB,
};
