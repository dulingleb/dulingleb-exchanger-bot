import { Action, createReducer, on } from '@ngrx/store'

import { USER_ACTIONS } from './user.actions'
import { IUserInDto } from './user.model'

export const userFeatureKey = 'User exchanger bot'

export interface IUserState {
  inRequest: boolean;
  inError: boolean;
  data: {
    user?: IUserInDto | null;
    token?: string;
    error?: Error | null;
  };
}

export const createUserInitState = (): IUserState => ({
  inRequest: false,
  inError: false,
  data: {}
})

export interface IAppWithUserState {
  user: IUserState;
}

export const createAppWithUiInitState = (): IAppWithUserState => ({
  user: createUserInitState()
})

export const userState = createReducer(
  createUserInitState(),

  on(USER_ACTIONS.login, state => ({ ...state, inRequest: true })),
  on(USER_ACTIONS.loginSuccess, (state, { userData }) => ({
    ...state,
    inRequest: false,
    inError: false,
    data: {
      user: userData.user,
      token: userData.accessToken,
      error: null
    }
  })),
  on(USER_ACTIONS.loginError, (state, { error }) => ({
    ...state,
    inRequest: false,
    inError: true,
    data: { user: null, token: '', error }
  }))

)

export const userReducer = (state: IUserState, action: Action): IUserState => userState(state, action)
