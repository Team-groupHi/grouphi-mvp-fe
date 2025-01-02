export interface GamesResponse {
  id: 'string';
  nameKr: 'string';
  nameEn: 'string';
  descriptionKr: 'string';
  descriptionEn: 'string';
  thumbnailUrl: 'string' | null;
}

export interface RoomGetResponse {
  id: string;
  status: 'WAITING' | 'PLAYING';
  game: GamesResponse;
  hostName: string;
  players: Player[];
}

export interface Player {
  name: string;
  isReady: boolean;
}

export interface BalanceGameResultGetResponse {
  round: number;
  q: string;
  a: string;
  b: string;
  result: BalanceGameSelectionsResponse;
}

export interface BalanceGameSelectionsResponse {
  a: string[];
  b: string[];
  c: string[];
}
