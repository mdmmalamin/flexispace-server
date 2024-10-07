import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.signupUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);

router.get('/users', auth('admin'), UserControllers.retrieveAllUsers);

router.get(
  '/users/my-profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.retrieveUser,
);

export const UserRoutes = router;
