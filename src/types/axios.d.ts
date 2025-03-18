// axios.d.ts
import 'axios';

declare module 'axios' {
  export interface AxiosError {
    response?: {
      data?: {
        code: string;
        message: string;
      };
    };
  }
}
