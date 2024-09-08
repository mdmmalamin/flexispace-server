import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err?.message?.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const statusCode = 400;
  const message = 'Validation Error: Duplicate !';
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `'${extractedMessage}' is already exist !`,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateError;
