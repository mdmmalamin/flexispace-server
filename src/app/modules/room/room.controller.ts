import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import { isDataFound } from '../../utils/isDataFound';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room added successfully',
    data: result,
  });
});

const retrieveAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.retrieveAllRoomsFromDB(req.query);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

const retrieveRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.retrieveRoomFromDB(id);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room retrieved successfully',
    data: result,
  });
});

const updateRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.updateRoomIntoDB(id, req.body);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room updated successfully',
    data: result,
  });
});

const deleteRoomById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoomFromDB(id);

  isDataFound(res, result);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  retrieveAllRooms,
  retrieveRoomById,
  updateRoomById,
  deleteRoomById,
};
