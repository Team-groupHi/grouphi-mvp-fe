export interface GamesResponse {
  id: string;
  nameKr: string;
  nameEn: string;
  descriptionKr: string;
  descriptionEn: string;
  thumbnailUrl: string | null;
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
  avatar: string;
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

export interface BalanceGameRoundResponse {
  totalRounds: number;
  currentRound: number;
  startTime: string;
  endTime: string;
  q: string;
  a: string;
  b: string;
}

export type QnaGameResult = {
  name: string;
  answer: string;
  likes: number;
};

export interface QnaGameResultGetResponse {
  round: number;
  question: string;
  result: QnaGameResult[];
}
