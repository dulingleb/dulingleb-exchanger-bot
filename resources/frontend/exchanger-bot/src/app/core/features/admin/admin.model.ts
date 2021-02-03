export interface IAdminInDto {
  id?: number;
  name: string;
  password?: string;
  cPassword?: string;
  email: string;
  role?: EAdminRoleDto;
  operationsCountToday?: number;
  operationsSumToday?: number;
  usersCountToday?: number;
  operationsWait?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EAdminRoleDto {
  SUPER_ADMIN = 1,
  ADMIN = 2,
}

export interface IAdminOutDto {
  id?: number;
  name: string;
  email: string;
  password?: string;
  c_password?: string;
  role_id?: EAdminRoleDto;
  operations_count_today?: number;
  operations_sum_today?: number;
  users_count_today?: number;
  operations_wait?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAdminLoginOutDto {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: IAdminOutDto;
}

export interface IAdminLoginInDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: IAdminInDto;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum EFilterAdminInOut {
  role = 'role_id',
  createdAt = 'created_at',
  updatedAt = 'updated_at'
}
