import { isAxiosError } from 'axios';

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`API Error: ${message}`);
  }
};

export const axiosErrorHandler = (error: unknown) => {
  if (!isAxiosError(error)) return;

  const { message, response, request } = error;

  if (response) {
    logOnDev(`${response.status} ${response.data}`);
  } else if (request) {
    logOnDev(`No Response Received From Server. ${message}`);
  } else {
    logOnDev(`${message}`);
  }

  throw error;
};
