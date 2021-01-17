import { createAction, props } from '@ngrx/store'

import { IUserLoginInDto } from './user.model'

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

export const USER_ACTIONS = {
  login,
  loginSuccess,
  loginError,
}
