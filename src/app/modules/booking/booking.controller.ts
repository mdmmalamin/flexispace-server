import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import { isDataFound } from '../../utils/isDataFound';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const retrieveAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.retrieveAllBookingsFromDB(req.query);

  isDataFound(res, result);

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

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingFromDB(id, req.body);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);

  isDataFound(res, result);

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
  deleteBooking,
};
