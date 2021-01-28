import { ITelegramUserInDto, ITelegramUserOutDto } from './telegram-user.model'

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
  files: [];
  telegram_user?: ITelegramUserOutDto;
}

export interface IOperationInDto {
  id: number;
  exchangerId: number;
  telegramUserId: number;
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
  files: [];
  telegramUser?: ITelegramUserInDto;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterOperationInOut {
  exchangerId = 'exchanger_id',
  linkTransaction = 'link_transaction',
  updatedAt = 'updated_at',
  createdAt = 'created_at',
  telegramUserId = 'telegram_user_id',
  btcAddress = 'btc_address',
  bankDetailId = 'bank_detail_id'
}
