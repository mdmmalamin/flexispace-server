import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RoomSearchableFields } from './room.constant';

const createRoomIntoDB = async (payload: TRoom) => {
  const isRoomNoExists = await Room.findOne({ roomNo: payload.roomNo });
  if (isRoomNoExists) {
    throw new ApiError(httpStatus.CONFLICT, 'This room no. already exists!');
  }

  const room = await Room.create(payload);

  return room;
};

const retrieveAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find(), query)
    .search(RoomSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await roomQuery.modelQuery;
  return result;
};

const retrieveRoomFromDB = async (id: string) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(httpStatus.CONFLICT, 'This room does not exists!');
  }

  return await Room.findById(id);
};

//!!! TODO: I'm trying to update & optimize this service
const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  if (typeof payload !== 'object' || payload === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid update data!');
  }

  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This room not found!');
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

  // console.log(updatedPayload);

  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(httpStatus.CONFLICT, 'This room does not exists!');
  }

  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  retrieveAllRoomsFromDB,
  retrieveRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
