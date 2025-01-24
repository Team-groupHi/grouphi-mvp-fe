import { create } from 'zustand';

interface RoomStoreProps {
  roomId: string | null;
  hostName: string | null;
  myName: string;
  setRoomId: (id: string) => void;
  setHostName: (name: string) => void;
  setMyName: (name: string) => void;
  reset: () => void;
}

const useRoomStore = create<RoomStoreProps>((set) => ({
  roomId: null,
  hostName: null,
  myName: '',
  setRoomId: (id) => set({ roomId: id }),
  setHostName: (name) => set({ hostName: name }),
  setMyName: (name) => set({ myName: name }),
  reset: () =>
    set({
      roomId: null,
      hostName: null,
      myName: '',
    }),
}));

export default useRoomStore;
