import ApiError from '../../errors/ApiError';
import { TUser } from './user.interface';
import { User } from './user.model';

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
    throw new ApiError(400, 'All fields are required');
  }

  const isUserExists = await User.findOne({
    $or: [{ email }, { phone }],
  });
  if (isUserExists) {
    throw new ApiError(400, 'User with email or phone already exists!');
  }

  const user = await User.create(userData);

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user!');
  }

  return createdUser;
};

export const UserServices = {
  createUserIntoDB,
};
