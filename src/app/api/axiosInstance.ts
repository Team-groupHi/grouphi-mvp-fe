import { NETWORK } from '@/constants/api';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  timeout: NETWORK.TIMEOUT,
});
