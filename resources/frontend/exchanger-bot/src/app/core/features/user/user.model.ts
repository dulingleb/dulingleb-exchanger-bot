export interface IUserInDto {
  id?: number;
  name: string;
  password?: string;
  cPassword?: string;
  email: string;
  role?: EUserRoleDto;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum EUserRoleDto {
  ADMIN = 1,
  SUPER_ADMIN = 2
}

export interface IUserOutDto {
  id?: number;
  name: string;
  email: string;
  password?: string;
  c_password?: string;
  role_id?: EUserRoleDto;
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
