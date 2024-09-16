import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/bookings',
  auth(USER_ROLE.user),
  BookingControllers.createBooking,
);

router.get(
  '/bookings',
  auth(USER_ROLE.admin),
  BookingControllers.retrieveAllBookings,
);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.retrieveUsersBookings,
);

router.put(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  BookingControllers.updateBooking,
);

router.delete(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  BookingControllers.deleteBooking,
);

export const BookingRoutes = router;
