import express from 'express';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/rooms', auth(USER_ROLE.admin), RoomControllers.createRoom);

export const RoomRoutes = router;
