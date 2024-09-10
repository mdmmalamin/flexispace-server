import express from 'express';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), RoomControllers.createRoom);

router.get('/', RoomControllers.retrieveAllRooms);

router.get('/:id', RoomControllers.retrieveRoomById);

router.put('/:id', auth(USER_ROLE.admin), RoomControllers.updateRoomById);

export const RoomRoutes = router;
