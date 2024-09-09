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
    //? checking - if the User is exist
    //? checking - if the User is already deleted
    //? checking - if the User is block
    //? checking - if JWT issued before password changed
    //? check - if the token role and requiredRoles matched

    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, id, iat } = decoded;

    const user = await User.isUserExistsByCustomId(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized! sign in again!',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized! invalid role!',
      );
    }

    next();
  });
};

export default auth;
