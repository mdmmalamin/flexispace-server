import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';

const createBookingIntoDB = async (payload: Partial<TBooking>) => {
  const { date, slots, room, user } = payload;

  if (!date || !slots || !room || !user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All fields must be required!');
  }

  const isBookingAvailable = await Slot.find({
    $and: [
      {
        _id: { $in: slots },
        date: date,
        room: room,
      },
    ],
  }).populate('room');

  if (isBookingAvailable?.length !== slots?.length) {
    const foundSlotIds = isBookingAvailable.map((slot) => slot._id.toString());

    const missingSlotIds = slots?.filter(
      (id) => !foundSlotIds.includes(id.toString()),
    );

    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Some slot IDs are missing from the database. Please verify the following IDs: ${missingSlotIds.join(', ')}.`,
    );
  }

  const bill = isBookingAvailable?.reduce(
    (acc, curr) => Number(acc + curr.room.pricePerSlot),
    0,
  );

  const updatePayload = new Booking({ totalAmount: bill, ...payload });
  console.log(updatePayload);

  const booking = await updatePayload.save();

  const result = await Booking.findById(booking._id)
    .populate('room')
    .populate('slots')
    .populate('user');
  console.log(result);

  return result;
};

const retrieveAllBookingsFromDB = async () => {
  return await Booking.find()
    .populate('slots')
    .populate('room')
    .populate('user');
};

const retrieveUsersBookingsFromDB = async () => {};

const updateBookingFromDB = async (payload: Partial<TBooking>) => {};

const deleteBookingFromDB = async (id: string) => {};

export const BookingServices = {
  createBookingIntoDB,
  retrieveAllBookingsFromDB,
  retrieveUsersBookingsFromDB,
  updateBookingFromDB,
  deleteBookingFromDB,
};
