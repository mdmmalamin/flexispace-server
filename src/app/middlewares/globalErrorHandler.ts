import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorMessages } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import ApiError from '../errors/ApiError';
import handleDuplicateError from '../errors/handleDuplicateError';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  // setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
    // console.log(simplifiedError);
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorSources;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;

    if (statusCode === httpStatus.UNAUTHORIZED) {
      return res.status(statusCode).json({
        success: false,
        statusCode: err?.statusCode,
        message: 'You have no access to this route',
      });
    }
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    // statusCode,
    message,
    errorMessages,
    // fullError: config.NODE_ENV === 'development' ? err : null,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/*
  @pattern

  success
  message
  errorMessages: [
    path: "",
    message: ""
  ]
  stack // this for only development environment
*/
