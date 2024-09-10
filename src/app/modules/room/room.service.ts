import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const isRoomNoExists = await Room.findOne({ roomNo: payload.roomNo });
  if (isRoomNoExists) {
    throw new ApiError(httpStatus.CONFLICT, 'This room no. already exists!');
  }

  const room = await Room.create(payload);

  return room;
};

export const RoomServices = {
  createRoomIntoDB,
};
