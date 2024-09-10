import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin), SlotControllers.createSlot);

export const SlotRoutes = router;
