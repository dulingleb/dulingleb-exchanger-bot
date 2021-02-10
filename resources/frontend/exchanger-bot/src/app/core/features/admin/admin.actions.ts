import { createAction, props } from '@ngrx/store'

import { IAdminOperationsCountInfoInDto, IAdminOperationsSumInfoInDto, IAdminUsersCountInfoInDto } from './admin.info.model'
import { IAdminInDto, IAdminLoginInDto } from './admin.model'

const init = createAction(
  '[Admin exchanger bot] Init'
)

const getAuthAdmin = createAction(
  '[Admin exchanger bot] Get auth admin',
  props<{ token: string }>()
)

const login = createAction(
  '[Admin exchanger bot] Login',
  props<{
    email: string;
    password: string;
  }>()
)

const loginSuccess = createAction(
  '[Admin exchanger bot] Login success',
  props<{ adminData: IAdminLoginInDto }>()
)

const loginError = createAction(
  '[Admin exchanger bot] Login error',
  props<{ error: Error }>()
)

const logout = createAction(
  '[Admin exchanger bot] Logout'
)

const saveToken = createAction(
  '[Admin exchanger bot] Save token',
  props<{ token: string }>()
)

const saveAdmin = createAction(
  '[Admin exchanger bot] Save admin',
  props<{ admin: IAdminInDto }>()
)

const redirectAfterAuth = createAction(
  '[Admin exchanger bot] Redirect after auth'
)

const redirectAfterLogout = createAction(
  '[Admin exchanger bot] Redirect after logout'
)

const getOperationsCount = createAction(
  '[Admin exchanger bot] Get operation count'
)

const saveOperationsCount = createAction(
  '[Admin exchanger bot] Save operation count',
  props<{ operationsData: IAdminOperationsCountInfoInDto }>()
)

const saveSubscribeLeft = createAction(
  '[Admin exchanger bot] Save subscribe left',
  props<{ subscribeLeft: number }>()
)

const getOperationsSum = createAction(
  '[Admin exchanger bot] Get operation sum'
)

const saveOperationsSum = createAction(
  '[Admin exchanger bot] Save operation sum',
  props<{ operationsData: IAdminOperationsSumInfoInDto }>()
)

const getOperationsWait = createAction(
  '[Admin exchanger bot] Get operation wait'
)

const saveOperationsWait = createAction(
  '[Admin exchanger bot] Save operation wait',
  props<{ operationsWait: number }>()
)

const getUsersCount = createAction(
  '[Admin exchanger bot] Get users count'
)

const saveUsersCount = createAction(
  '[Admin exchanger bot] Save users count',
  props<{ usersData: IAdminUsersCountInfoInDto }>()
)

const infoError = createAction(
  '[Admin exchanger bot] Info error',
  props<{ error: Error }>()
)

export const ADMIN_ACTIONS = {
  init,
  getAuthAdmin,

  login,
  loginSuccess,
  loginError,
  logout,

  saveToken,
  saveAdmin,
  redirectAfterAuth,
  redirectAfterLogout,

  getOperationsCount,
  saveOperationsCount,
  saveSubscribeLeft,
  getOperationsSum,
  saveOperationsSum,
  getOperationsWait,
  saveOperationsWait,
  getUsersCount,
  saveUsersCount,

  infoError,
}
