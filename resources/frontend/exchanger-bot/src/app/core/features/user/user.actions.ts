import { createAction, props } from '@ngrx/store'

import { IUserInDto, IUserLoginInDto } from './user.model'

const init = createAction(
  '[User exchanger bot] Init'
)

const getAuthUser = createAction(
  '[User exchanger bot] Get auth user',
  props<{ token: string }>()
)

const login = createAction(
  '[User exchanger bot] Login',
  props<{
    email: string;
    password: string;
  }>()
)

const loginSuccess = createAction(
  '[User exchanger bot] Login success',
  props<{ userData: IUserLoginInDto }>()
)

const loginError = createAction(
  '[User exchanger bot] Login error',
  props<{ error: Error }>()
)

const logout = createAction(
  '[User exchanger bot] Logout'
)

const saveToken = createAction(
  '[User exchanger bot] Save token',
  props<{ token: string }>()
)

const saveUser = createAction(
  '[User exchanger bot] Save user',
  props<{ user: IUserInDto }>()
)

const redirectAfterAuth = createAction(
  '[User exchanger bot] Redirect after auth'
)

const redirectAfterLogout = createAction(
  '[User exchanger bot] Redirect after logout'
)

export const USER_ACTIONS = {
  init,
  getAuthUser,

  login,
  loginSuccess,
  loginError,
  logout,

  saveToken,
  saveUser,
  redirectAfterAuth,
  redirectAfterLogout
}
