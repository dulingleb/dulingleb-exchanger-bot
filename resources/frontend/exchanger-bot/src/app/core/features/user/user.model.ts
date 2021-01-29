export interface IUserInDto {
  id?: number;
  name: string;
  password?: string;
  cPassword?: string;
  email: string;
  role?: EUserRoleDto;
  operationsCountToday?: number;
  operationsSumToday?: number;
  usersCountToday?: number;
  operationsWait?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EUserRoleDto {
  SUPER_ADMIN = 1,
  ADMIN = 2,
}

export interface IUserOutDto {
  id?: number;
  name: string;
  email: string;
  password?: string;
  c_password?: string;
  role_id?: EUserRoleDto;
  operations_count_today?: number;
  operations_sum_today?: number;
  users_count_today?: number;
  operations_wait?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserLoginOutDto {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: IUserOutDto;
}

export interface IUserLoginInDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: IUserInDto;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterUserInOut {
  role = 'role_id',
  createdAt = 'created_at',
  updatedAt = 'updated_at'
}
