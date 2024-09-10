import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
};
