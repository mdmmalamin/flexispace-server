import httpStatus from 'http-status';
import apiResponse from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const signupUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await UserServices.createUserIntoDB(user);

  apiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const UserControllers = {
  signupUser,
};
