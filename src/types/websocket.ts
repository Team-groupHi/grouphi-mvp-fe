import * as StompJS from '@stomp/stompjs';

export type SendMessage = <T>(
  params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
) => void;

/* Response */

export interface BalanceGameRoundResponse {
  totalRounds: number;
  currentRound: number;
  playSeconds: number;
  q: string;
  a: string;
  b: string;
}

export interface QnaGameRoundResponse {
  totalRounds: number;
  currentRound: number;
  question: string;
}
