import * as StompJS from '@stomp/stompjs';
import { useMemo } from 'react';

import { SOCKET } from '@/constants/websocket';
import { throttle } from '@/utils/throttle';

const useThrottleReadyHandlers = (
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void
) => {
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
