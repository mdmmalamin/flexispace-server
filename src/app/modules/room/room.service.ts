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

const retrieveAllRoomsFromDB = async () => {
  return await Room.find();
};

const retrieveRoomByIdFromDB = async (id: string) => {
  return await Room.findById(id);
};

//!!! TODO: I'm trying to update & optimize this service
const updateRoomByIdIntoDB = async (id: string, payload: Partial<TRoom>) => {
  if (typeof payload !== 'object' || payload === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid update data!');
  }

  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found!');
  }

  const updatedPayload = { ...room.toObject(), ...payload };

  const result = await Room.findByIdAndUpdate(
    id,
    { ...updatedPayload },
    {
      new: true,
      runValidators: true,
    },
  );

  console.log(updatedPayload)

  return result;
};

const deleteRoomByIdFromDB = async (id: string) => {
  return await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
};

export const RoomServices = {
  createRoomIntoDB,
  retrieveAllRoomsFromDB,
  retrieveRoomByIdFromDB,
  updateRoomByIdIntoDB,
  deleteRoomByIdFromDB,
};
