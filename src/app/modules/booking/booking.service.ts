import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { TUser } from '../user/user.interface';

const createBookingIntoDB = async (payload: TBooking) => {};

const retrieveAllBookingsFromDB = async () => {
  return await Booking.find();
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
