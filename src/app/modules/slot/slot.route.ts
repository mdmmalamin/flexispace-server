import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidation } from './slot.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidation.createSlotValidationSchema),
  SlotControllers.createSlot,
);

router.get('/availability', SlotControllers.retrieveAvailableSlots);

router.put('/:id', auth(USER_ROLE.admin), SlotControllers.updateSlotById);

router.delete('/:id', auth(USER_ROLE.admin), SlotControllers.deleteSlotById);

export const SlotRoutes = router;
