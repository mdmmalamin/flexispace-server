import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../../utils/generateAccessToken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  //? get user details from frontend (req.body)
  //? check - if role is not given , use default role = user
  //? validation - not empty
  //? check if user already exists: username, email
  //? check for images, check for avatar
  // ? upload them to cloudinary, avatar
  //? create user object - create entry in db
  //? remove password and refresh token field from response
  //? check for user creation
  //? return res
  //! console.log({ PAYLOAD: payload });
  const userData: Partial<TUser> = { ...payload };

  if (!payload?.role) {
    userData.role = 'user';
  }
  //! console.log({ USERDATA: userData });

  const { name, email, password, phone } = userData;
  if ([name, email, password, phone].some((field) => field?.trim() === '')) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
  }

  const isUserExists = await User.findOne({
    $or: [{ email }, { phone }],
  });
  if (isUserExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User with email or phone already exists!',
    );
  }

  const user = await User.create(userData);

  const createdUser = await User.findById(user._id).select(
    '-createdAt -updatedAt -__v',
  );
  if (!createdUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while registering the user!',
    );
  }

  return createdUser;
};

const loginUserFromDB = async (payload: TUser) => {
  //? validation - payload not empty
  //? check - is user exists
  //? check - is password correct
  //? create - accessToken
  //? login user and send res with token
  const { email, password } = payload;

  if (!email || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Email or Password is required!',
    );
  }

  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isPasswordValid = await User.isPasswordCorrect(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Password is incorrect!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  if (!accessToken) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while generating access token!',
    );
  }

  const userResponse = await User.findOne({ email: user.email }).select(
    '-createdAt -updatedAt -__v',
  );
  if (!userResponse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  return { userResponse, accessToken };
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
};
