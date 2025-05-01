import { create } from 'zustand';

type roomStatusType = 'idle' | 'progress' | 'result' | 'finalResult';

interface RoomStoreProps {
  roomStatus: roomStatusType;
  totalRounds: number;
  roomId: string | null;
  hostName: string | null;
  myName: string;
  setRoomStatus: (status: roomStatusType) => void;
  setTotalRounds: (round: number) => void;
  setRoomId: (id: string) => void;
  setHostName: (name: string) => void;
  setMyName: (name: string) => void;
  reset: () => void;
}

const useRoomStore = create<RoomStoreProps>((set) => ({
  roomStatus: 'idle',
  totalRounds: 0,
  roomId: null,
  hostName: null,
  myName: '',
  setRoomStatus: (status) => set({ roomStatus: status }),
  setTotalRounds: (round) => set({ totalRounds: round }),
  setRoomId: (id) => set({ roomId: id }),
  setHostName: (name) => set({ hostName: name }),
  setMyName: (name) => set({ myName: name }),
  reset: () =>
    set({
      roomStatus: 'idle',
      roomId: null,
      hostName: null,
    }),
}));

export default useRoomStore;
