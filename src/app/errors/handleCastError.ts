import mongoose from 'mongoose';
import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Mongoose Cast Validation Error: Invalid ID !';
  const errorSources: TErrorMessages = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleCastError;
