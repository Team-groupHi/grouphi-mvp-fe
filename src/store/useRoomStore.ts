import { create } from 'zustand';

import { ROOM_STATUS } from '@/constants/room';
import { roomStatusType } from '@/types/room';

interface RoomStoreProps {
  roomStatus: roomStatusType;
  roomId: string | null;
  gameId: string | null;
  hostName: string | null;
  myName: string;
  setRoomStatus: (status: roomStatusType) => void;
  setRoomId: (id: string) => void;
  setHostName: (name: string) => void;
  setMyName: (name: string) => void;
  getHostName: () => string | null;
  reset: () => void;
}

const useRoomStore = create<RoomStoreProps>((set, get) => ({
  roomStatus: ROOM_STATUS.IDLE,
  roomId: null,
  gameId: null,
  hostName: null,
  myName: '',
  setRoomStatus: (status) => set({ roomStatus: status }),
  setRoomId: (id) => set({ roomId: id }),
  setHostName: (name) => set({ hostName: name }),
  setMyName: (name) => set({ myName: name }),
  getHostName: () => get().hostName,
  reset: () =>
    set({
      roomStatus: ROOM_STATUS.IDLE,
      roomId: null,
      hostName: null,
    }),
}));

export default useRoomStore;
