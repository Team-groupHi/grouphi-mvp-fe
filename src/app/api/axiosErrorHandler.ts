import { AxiosError } from 'axios';

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`API Error: ${message}`);
  }
};

export const axiosErrorHandler = (error: unknown) => {
  if (!(error instanceof AxiosError)) return;

  console.log(error);
  throw new Error(error.message);

  //const { message, response, request } = error;

  // if (response) {
  //   logOnDev(`${response.status} ${response.data}`);
  // } else if (request) {
  //   logOnDev(`No Response Received From Server. ${message}`);
  // } else {
  //   logOnDev(`${message}`);
  // }
};
