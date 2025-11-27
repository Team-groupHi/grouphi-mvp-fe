import { ROOM_STATUS } from '@/constants/room';

export type roomStatusType = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];
