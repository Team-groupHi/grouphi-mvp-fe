import axios from 'axios';

import { NETWORK } from '@/constants/api';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: NETWORK.TIMEOUT,
});
