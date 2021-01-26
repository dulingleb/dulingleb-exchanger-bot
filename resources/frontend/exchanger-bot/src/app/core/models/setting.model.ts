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

export interface ISettingOutDto extends ISettingLimitOutDto, ISettingTelegramOutDto, ISettingKeysOutDto {
  id: number;
  status: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ISettingInDto extends ISettingLimitInDto, ISettingTelegramInDto, ISettingKeysInDto {
  id: number;
  status: number;
  userId: number;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
}

export interface ISettingMessageDto {
  id: number;
  title: string;
  slug: string;
}

export interface ISettingMessageDto {
  id: number;
  title: string;
  slug: string;
  text?: string;
  description?: string;
}

export interface ISettingRequisiteDto {
  id: number;
  title: string;
  text?: string;
  status: boolean;
}

export interface ISettingCommissionDto {
  id: number;
  from: number;
  to: number;
  percent: number;
}
