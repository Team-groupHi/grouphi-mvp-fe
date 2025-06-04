type CommonErrorCode = 'E000' | 'E001' | 'E002';

type RoomErrorCode =
  | 'R001'
  | 'R002'
  | 'R003'
  | 'R004'
  | 'R006'
  | 'R007'
  | 'R008';

type BalanceGameErrorCode = 'B002' | 'B003';

export type ErrorCode = CommonErrorCode | RoomErrorCode | BalanceGameErrorCode;
