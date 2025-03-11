// axios.d.ts
import 'axios';

declare module 'axios' {
  export interface AxiosError {
    response?: {
      data?: {
        code: string; // 또는 number
        message: string;
        // 다른 속성이 필요하다면 추가
      };
    };
  }
}
