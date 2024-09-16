import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const retrieveAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.retrieveAllBookingsFromDB();

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const retrieveUsersBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.retrieveUsersBookingsFromDB(user);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.updateBookingFromDB(req.body);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBookingFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  retrieveAllBookings,
  retrieveUsersBookings,
  updateBooking,
  deleteBookingFromDB,
};
