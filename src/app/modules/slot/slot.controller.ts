import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import { isDataFound } from '../../utils/isDataFound';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

const retrieveAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.retrieveAvailableSlotsFromDB(req.query);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  retrieveAvailableSlots,
};
