import { create } from 'zustand';

import { SendMessage } from '@/types/websocket';

interface SocketStoreProps {
  sendMessage: SendMessage | null;
  setSendMessage: (sendFn: SendMessage | null) => void;
}

const useSocketStore = create<SocketStoreProps>((set) => ({
  sendMessage: null,
  setSendMessage: (sendFn) => set({ sendMessage: sendFn }),
}));

export default useSocketStore;
