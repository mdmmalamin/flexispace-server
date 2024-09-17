import express from 'express';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.createRoomValidationSchema),
  RoomControllers.createRoom,
);

router.get('/', RoomControllers.retrieveAllRooms);

router.get('/:id', RoomControllers.retrieveRoomById);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.updateRoomValidationSchema),
  RoomControllers.updateRoomById,
);

router.delete('/:id', auth(USER_ROLE.admin), RoomControllers.deleteRoomById);

export const RoomRoutes = router;
