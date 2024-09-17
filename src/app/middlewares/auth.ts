import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //? check - if the token is send from the client headers
    //? check - if the token is missing
    //? check - if the given token is valid
    //? decoded - accessToken decoded
    //? check - if the token role and requiredRoles matched

    const authHeader = req.headers.authorization;
    // console.log('authHeader: ', authHeader);

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // console.log('role: ', role);

    req.user = user;
    next();
  });
};

export default auth;
