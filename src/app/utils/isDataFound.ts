import httpStatus from 'http-status';
import apiResponse from './apiResponse';
import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDataFound = (res: Response, result: any) => {
  if (result === null || result?.length === 0) {
    apiResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
};
