import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import config from '../../config';

const signupUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserFromDB(req.body);
  const { accessToken, userResponse } = result;

  res.cookie('accessToken', `Bearer ${accessToken}`, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: userResponse,
  });
});

export const UserControllers = {
  signupUser,
  loginUser,
};
