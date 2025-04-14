/* Request */

export interface RoomPlayerNameValidationRequest {
  roomId: string;
  name: string;
}

export interface BalanceGameResultRequest {
  roomId: string;
  round?: number;
}

/* Response */

export interface GameResponse {
  id: 'string';
  nameKr: 'string';
  nameEn: 'string';
  descriptionKr: 'string';
  descriptionEn: 'string';
  thumbnailUrl: 'string' | null;
}

export interface RoomResponse {
  id: string;
  status: 'WAITING' | 'PLAYING';
  game: GameResponse;
  players: Player[];
}

export interface Player {
  name: string;
  isReady: boolean;
  isHost: boolean;
  avatar: string;
}

export interface BalanceGameResultResponse {
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
