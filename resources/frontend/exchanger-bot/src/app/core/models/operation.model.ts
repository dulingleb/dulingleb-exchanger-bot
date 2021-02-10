import { ITelegramUserInDto, ITelegramUserOutDto } from './telegram-user.model'
import { ISettingRequisiteDto } from './setting.model'

export interface IOperationOutDto {
  id: number;
  exchanger_id: number;
  telegram_user_id: number;
  bank_detail_id: number;
  amount: number;
  price: number;
  btc_address: string;
  status: number;
  comment: string;
  link_transaction: string;
  message_id: string;
  updated_at: Date;
  created_at: Date;
  files: string[];
  telegram_user?: ITelegramUserOutDto;
  bank_details?: ISettingRequisiteDto;
}

export interface IOperationInDto {
  id: number;
  exchangerId: number;
  telegramUserId: number;
  telegramUserName?: number;
  bankDetailId: number;
  amount: number;
  price: number;
  btcAddress: string;
  status: number;
  comment: string;
  linkTransaction: string;
  messageId: string;
  updatedAt: Date;
  createdAt: Date;
  files: string[];
  telegramUser?: ITelegramUserInDto;
  bankDetails?: ISettingRequisiteDto;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterOperationInOut {
  exchangerId = 'exchanger_id',
  linkTransaction = 'link_transaction',
  updatedAt = 'updated_at',
  createdAt = 'created_at',
  telegramUserId = 'telegram_user_id',
  telegramUserName = 'telegram_user_name',
  btcAddress = 'btc_address',
  bankDetailId = 'bank_detail_id'
}
