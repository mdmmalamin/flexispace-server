import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TSlot } from './slot.interface';

const createSlotIntoDB = async (payload: TSlot) => {
  console.log(payload);
};

export const SlotServices = {
  createSlotIntoDB,
};
