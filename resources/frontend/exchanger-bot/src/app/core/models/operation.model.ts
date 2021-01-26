export interface IOperationOutDto {
  id: number;
  username: string;
  amount: number;
  price: number;
  telegram_user_id: number;
  first_name: string;
  last_name: string;
  bank_detail_id: number;
  btc_address: string;
  comment: string;
  exchanger_id: number;
  files: [];
  link_transaction: string;
  status: number;
  updated_at: Date;
  created_at: Date;
}

export interface IOperationInDto {
  id: number;
  username: string;
  amount: number;
  price: number;
  telegramUserId: number;
  firstName: string;
  lastName: string;
  bankDetailId: number;
  btcAddress: string;
  comment: string;
  exchangerId: number;
  files: [];
  linkTransaction: string;
  status: number;
  updatedAt: Date;
  createdAt: Date;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterOperationInOut {
  exchangerId = 'exchanger_id',
  linkTransaction = 'link_transaction',
  updatedAt = 'updated_at',
  createdAt = 'created_at',
  firstName = 'first_name',
  lastName = 'last_name',
  telegramUserId = 'telegram_user_id',
  btcAddress = 'btc_address',
  bankDetailId = 'bank_detail_id'
}
