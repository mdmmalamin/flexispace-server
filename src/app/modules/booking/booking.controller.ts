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

export const BookingControllers = {
  createBooking,
};
