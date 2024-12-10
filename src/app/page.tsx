'use client';
import { getGames } from '@/services/games';
import { HomeClient } from '@/components';
import { useEffect, useState } from 'react';
import { GamesResponse } from '@/types/api';

export default function Home() {
  // const games = await getGames();

  const [games, setGames] = useState<GamesResponse[]>([]);

  const loadGames = async () => {
    try {
      const data = await getGames();
      if (data) {
        setGames(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  return <HomeClient games={games ?? []} />;
}
