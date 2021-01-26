export interface ISettingOutDto {
  id: number;
  username: string;
  coinbase_key: string;
  coinbase_secret: string;
  course: number;
  max_exchange: number;
  min_exchange: number;
  status: number;
  telegram_token: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ISettingInDto {
  id: number;
  username: string;
  coinbaseKey: string;
  coinbaseSecret: string;
  course: number;
  maxExchange: number;
  minExchange: number;
  status: number;
  telegramToken: string;
  userId: number;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
}

export interface ISettingLimitOutDto {
  course: number;
  max_exchange: number;
  min_exchange: number;
}

export interface ISettingLimitInDto {
  course: number;
  maxExchange: number;
  minExchange: number;
}

export interface ISettingTelegramOutDto {
  telegram_token: string;
  username: string;
}

export interface ISettingTelegramInDto {
  telegramToken: string;
  username: string;
}

export interface ISettingKeysOutDto {
  coinbase_key: string;
  coinbase_secret: string;
}

export interface ISettingKeysInDto {
  coinbaseKey: string;
  coinbaseSecret: string;
}
