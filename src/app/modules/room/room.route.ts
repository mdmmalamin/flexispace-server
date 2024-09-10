import express from 'express';
import { RoomControllers } from './room.controller';

const router = express.Router();

router.post('/rooms', RoomControllers.createRoom);

export const RoomRoutes = router;
