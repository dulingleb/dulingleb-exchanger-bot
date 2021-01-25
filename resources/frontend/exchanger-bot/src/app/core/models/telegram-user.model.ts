export interface ITelegramUserInDto {
  id: number;
  username: string;
  exchangerId: number;
  telegramUserId: number;
  operationsCount: number;
  discount?: number;
  comment?: string;
  ban?: boolean;
}

export interface ITelegramUserOutDto {
  id: number;
  username: string;
  exchanger_id: number;
  telegram_user_id: number;
  operations_count: number;
  discount?: number;
  comment?: string;
  ban?: boolean;
}

export interface ITelegramUserDataDto {
  id: number;
  discount?: number;
  comment?: string;
  ban?: boolean;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterTelegramUserInOut {
  exchangerId = 'exchanger_id',
  telegramUserId = 'telegram_user_id',
  operationsCount = 'operations_count'
}
