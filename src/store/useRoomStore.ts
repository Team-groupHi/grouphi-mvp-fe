import { create } from 'zustand';

import { ROOM_STATUS } from '@/constants/room';

type roomStatusType = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];

interface RoomStoreProps {
  roomStatus: roomStatusType;
  roomId: string | null;
  hostName: string | null;
  myName: string;
  setRoomStatus: (status: roomStatusType) => void;
  setRoomId: (id: string) => void;
  setHostName: (name: string) => void;
  setMyName: (name: string) => void;
  reset: () => void;
}

const useRoomStore = create<RoomStoreProps>((set) => ({
  roomStatus: ROOM_STATUS.IDLE,
  roomId: null,
  hostName: null,
  myName: '',
  setRoomStatus: (status) => set({ roomStatus: status }),
  setRoomId: (id) => set({ roomId: id }),
  setHostName: (name) => set({ hostName: name }),
  setMyName: (name) => set({ myName: name }),
  reset: () =>
    set({
      roomStatus: ROOM_STATUS.IDLE,
      roomId: null,
      hostName: null,
    }),
}));

export default useRoomStore;
