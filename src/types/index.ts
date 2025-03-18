export interface ChatMessage {
  sender: string;
  content: string;
}

type CommonErrorCode = 'E000';

type RoomErrorCode =
  | 'R001'
  | 'R002'
  | 'R003'
  | 'R004'
  | 'R005'
  | 'R006'
  | 'R007'
  | 'R008';

type BalanceGameErrorCode = 'B001' | 'B002' | 'B003' | 'B004' | 'B005';

export type ErrorCode = CommonErrorCode | RoomErrorCode | BalanceGameErrorCode;

export const ERROR_MESSAGE: Record<ErrorCode, string> = {
  E000: '서버에 문제가 생겼어요.',
  R001: '게임 정보가 존재하지 않아요.',
  R002: '방 정보가 존재하지 않아요.',
  R003: '현재 최대 인원 수에 도달해 더 이상 입장할 수 없어요.',
  R004: '닉네임이 유효하지 않습니다.',
  R005: '방장만 게임을 바꿀 수 있어요.',
  R006: '이름은 준비 상태가 아닐 때만 변경 가능해요.',
  R007: '게임이 이미 시작되었어요! 게임이 끝나면 입장해주세요.',
  R008: '최소 2명 이상의 플레이어가 있어야 게임을 시작할 수 있어요.',
  B001: '방장만 게임을 시작할 수 있어요.',
  B002: '아직 준비되지 않은 플레이어가 있어요.',
  B003: '라운드는 10~20개 사이로 설정 가능해요.',
  B004: '방장만 다음 라운드로 이동할 수 있어요.',
  B005: '방장만 게임을 종료할 수 있어요.',
};
