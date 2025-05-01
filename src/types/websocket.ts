/* Response */

export interface BalanceGameRoundResponse {
  totalRounds: number;
  currentRound: number;
  startTime: string;
  endTime: string;
  q: string;
  a: string;
  b: string;
}

export interface QnaGameRoundResponse {
  totalRounds: number;
  currentRound: number;
  question: string;
}
