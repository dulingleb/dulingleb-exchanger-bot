export interface ITelegramUserInDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  exchangerId: number;
  telegramUserId: number;
  operationsCount: number;
  operationsSum: number;
  discount?: number;
  comment?: string;
  ban?: boolean;
}

export interface ITelegramUserOutDto {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  exchanger_id: number;
  telegram_user_id: number;
  operations_count: number;
  operations_sum: number;
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
  firstName = 'first_name',
  lastName = 'last_name',
  exchangerId = 'exchanger_id',
  telegramUserId = 'telegram_user_id',
  operationsCount = 'operations_count',
  operationsSum = 'operations_sum'
}
