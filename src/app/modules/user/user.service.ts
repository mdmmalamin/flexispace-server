import { TUser } from './user.interface';

const createUserIntoDB = async (payload: TUser) => {
  // create a user object
  // const userData: Partial<TUser> = {};
  console.log(payload);
};

export const UserServices = {
  createUserIntoDB,
};
