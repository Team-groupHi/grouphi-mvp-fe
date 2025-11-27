import * as StompJS from '@stomp/stompjs';
import { create } from 'zustand';

interface SocketStoreProps {
  sendMessage:
    | (<T>(params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }) => void)
    | null;
  setSendMessage: (
    sendFn:
      | (<T>(
          params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
        ) => void)
      | null
  ) => void;
}

const useSocketStore = create<SocketStoreProps>((set) => ({
  sendMessage: null,
  setSendMessage: (sendFn) => set({ sendMessage: sendFn }),
}));

export default useSocketStore;
