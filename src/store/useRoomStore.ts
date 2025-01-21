import { create } from 'zustand';

interface RoomStoreProps {
  roomId: string | null;
  hostName: string | null;
  myName: string | null;
  questionCount: number | null;
  setRoomId: (id: string) => void;
  setHostName: (name: string) => void;
  setMyName: (name: string) => void;
  setQuestionCount: (count: number) => void;
  reset: () => void;
}

const useRoomStore = create<RoomStoreProps>((set) => ({
  roomId: null,
  hostName: null,
  myName: null,
  questionCount: null,
  setRoomId: (id) => set({ roomId: id }),
  setHostName: (name) => set({ hostName: name }),
  setMyName: (name) => set({ myName: name }),
  setQuestionCount: (count) => set({ questionCount: count }),
  reset: () => set({ hostName: null, questionCount: null }),
}));

export default useRoomStore;
