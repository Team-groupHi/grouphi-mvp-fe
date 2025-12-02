import { create } from 'zustand';

import { SendMessage } from '@/types/websocket';

interface SocketStoreProps {
  sendMessage: SendMessage | null;
  setSendMessage: (sendFn: SendMessage | null) => void;
  reset: () => void;
}

const useSocketStore = create<SocketStoreProps>((set) => ({
  sendMessage: null,
  setSendMessage: (sendFn) => set({ sendMessage: sendFn }),
  reset: () =>
    set({
      sendMessage: null,
    }),
}));

export default useSocketStore;
