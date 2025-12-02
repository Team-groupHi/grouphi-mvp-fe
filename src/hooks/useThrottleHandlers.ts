import { useMemo } from 'react';

import { SOCKET } from '@/constants/websocket';
import { SendMessage } from '@/types/websocket';
import { throttle } from '@/utils/throttle';

const useThrottleReadyHandlers = (sendMessage: SendMessage) => {
  const handleReady = useMemo(() => {
    const throttledFn = throttle(() => {
      sendMessage({
        destination: `${SOCKET.ROOM.READY}`,
      });
    }, 500);

    return throttledFn;
  }, [sendMessage]);

  const handleUnready = useMemo(() => {
    const throttledFn = throttle(() => {
      sendMessage({
        destination: `${SOCKET.ROOM.UNREADY}`,
      });
    }, 500);

    return throttledFn;
  }, [sendMessage]);

  return { handleReady, handleUnready };
};

export default useThrottleReadyHandlers;
