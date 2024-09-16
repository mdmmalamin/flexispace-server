/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';
import { JwtPayload } from 'jsonwebtoken';
import { Room } from '../room/room.model';

const createBookingIntoDB = async (payload: Partial<TBooking>) => {
  const { date, slots, room, user } = payload;

  if (!date || !slots || !room || !user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All fields must be required!');
  }

  const availableSlots = await Slot.find({
    $and: [
      {
        _id: { $in: slots },
        date: date,
        room: room,
        isBooked: false,
      },
    ],
  }).populate('room');

  if (availableSlots?.length !== slots?.length) {
    const foundSlotIds = availableSlots.map((slot) => slot._id.toString());

    const missingSlotIds = slots?.filter(
      (id) => !foundSlotIds.includes(id.toString()),
    );

    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Some slot IDs are either booked or missing from the database. Please verify the following IDs: ${missingSlotIds.join(', ')}.`,
    );
  }

  const availableRoom = await Room.findById(room).select(
    '+pricePerSlot +isDeleted',
  );
  console.log(availableRoom, 'Room');

  if (availableRoom?.isDeleted === true) {
    throw new ApiError(httpStatus.CONFLICT, 'This room already deleted!');
  }

  const bill = availableSlots?.reduce(
    (acc, curr) => Number(acc + availableRoom!.pricePerSlot),
    0,
  );

  const updatePayload = new Booking({ totalAmount: bill, ...payload });

  // Update the slots to set isBooked to true
  await Slot.updateMany({ _id: { $in: slots } }, { $set: { isBooked: true } });

  const booking = await updatePayload.save();

  const result = await Booking.findById(booking._id)
    .populate('room')
    .populate('slots')
    .populate('user');
  // console.log(result);

  return result;
};

const retrieveAllBookingsFromDB = async () => {
  return await Booking.find()
    .populate('slots')
    .populate('room')
    .populate('user');
};

const retrieveUsersBookingsFromDB = async (user: JwtPayload) => {
  const result = await Booking.findOne({ user: user._id })
    .select('-user')
    .populate('slots')
    .populate('room');

  return result;
};

const updateBookingFromDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  retrieveAllBookingsFromDB,
  retrieveUsersBookingsFromDB,
  updateBookingFromDB,
  deleteBookingFromDB,
};
