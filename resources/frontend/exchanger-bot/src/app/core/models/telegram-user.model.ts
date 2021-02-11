export interface ITelegramUserInDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  exchangerId: number;
  telegramUserId: number;
  role: ETelegramUserRole;
  operationsCount: number;
  operationsSum: number;
  refCount: number;
  refActiveCount: number;
  refOperationsCount: number;
  refOperationsSum: number;
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
  role: ETelegramUserRole;
  operations_count: number;
  operations_sum: number;
  ref_count: number;
  ref_active_count: number;
  ref_operations_count: number;
  ref_operations_sum: number;
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

export enum ETelegramUserRole {
  USER = 'user',
  ADMIN = 'admin'
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterTelegramUserInOut {
  firstName = 'first_name',
  lastName = 'last_name',
  exchangerId = 'exchanger_id',
  telegramUserId = 'telegram_user_id',
  operationsCount = 'operations_count',
  operationsSum = 'operations_sum',
  refCount = 'ref_count',
  refActiveCount = 'ref_active_count',
  refOperationsCount = 'ref_operations_count',
  refOperationsSum = 'ref_operations_sum',
}
