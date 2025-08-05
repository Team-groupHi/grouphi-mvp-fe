import { useEffect, useState } from 'react';

import { DOMAIN } from '@/constants/api';

export const useSSE = () => {
  const [time, setTime] = useState<string | null>(null);
  const [error, setError] = useState<Event | Error | null>(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      setError(new Error('NEXT_PUBLIC_BASE_URL is not defined.'));
      return;
    }
    const getTimeUrl = `${baseUrl}${DOMAIN.GET_TIME}`;
    const eventSource = new EventSource(getTimeUrl);

    eventSource.addEventListener('time', (event) => {
      const time = event.data.trim().replace(/^"|"$/g, '');
      setTime(time);
    });

    eventSource.onerror = (event) => {
      setError(event);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { time, error };
};
