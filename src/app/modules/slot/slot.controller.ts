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

const deleteDeleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.deleteSlotFromDB(id);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot deleted successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  retrieveAvailableSlots,
  deleteDeleteById,
};
