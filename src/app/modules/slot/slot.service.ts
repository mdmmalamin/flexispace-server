import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { Room } from '../room/room.model';
import { formatTime } from './slot.utils';

const createSlotIntoDB = async (payload: TSlot) => {
  //? check --> all fields are send in payload, not empty
  //? check --> if room not exist then error throw
  //? convert --> startTime & endTime convert to minutes
  //? loop --> create slot or slots into db: depends on total duration of slot and slotDuration

  const { room, date, startTime, endTime } = payload;

  if ([room, date, startTime, endTime].some((field) => field === '')) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
  }

  const isRoomExists = await Room.findOne({ _id: payload.room });
  if (!isRoomExists) {
    throw new ApiError(httpStatus.CONFLICT, 'This room is not found!');
  }

  const slotDuration = 60;

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  const totalDuration = endTotalMinutes - startTotalMinutes;

  if (totalDuration <= 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'End time must be after start time',
    );
  }

  const createdSlots = [];

  for (let i = 0; i < totalDuration / slotDuration; i++) {
    let currentStartMinutes = startTotalMinutes;

    const slotEndMinutes = currentStartMinutes + slotDuration;
    const slotEndHours = Math.floor(slotEndMinutes / 60);
    const adjustedSlotEndMinutes = slotEndMinutes % 60;

    const updatedPayload = {
      ...payload,
      startTime: formatTime(
        Math.floor(currentStartMinutes / 60),
        currentStartMinutes % 60,
      ),
      endTime: formatTime(slotEndHours, adjustedSlotEndMinutes),
    };

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

export const SlotServices = {
  createSlotIntoDB,
};
