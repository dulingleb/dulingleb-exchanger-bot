export interface ITelegramUserInDto {
  id: number;
  username: string;
  exchangerId: number;
  telegramUserId: number;
  operationsCount: number;
}

export interface ITelegramUserOutDto {
  id: number;
  username: string;
  exchanger_id: number;
  telegram_user_id: number;
  operations_count: number;
}
