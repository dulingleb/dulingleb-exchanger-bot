import { Action, createReducer, on } from '@ngrx/store'

import { ICommonResponseDto } from '@core/models'

import { IAdminOperationsCountInfoInDto, IAdminOperationsSumInfoInDto, IAdminUsersCountInfoInDto } from './admin.info.model'
import { ADMIN_ACTIONS } from './admin.actions'
import { IAdminInDto } from './admin.model'

export const adminFeatureKey = 'Admin exchanger bot'

export interface IAdminState {
  inRequest: boolean;
  inError: boolean;
  data: {
    admin?: IAdminInDto | null;
    token?: string;
    operationsCountData?: IAdminOperationsCountInfoInDto;
    operationsSumData?: IAdminOperationsSumInfoInDto;
    operationsWait?: number;
    subscribeLeft?: number;
    usersCountData?: IAdminUsersCountInfoInDto;
    error?: ICommonResponseDto<null> | null;
  };
}

export const createAdminInitState = (): IAdminState => ({
  inRequest: false,
  inError: false,
  data: {}
})

export interface IAppWithAdminState {
  admin: IAdminState;
}

export const createAppWithUiInitState = (): IAppWithAdminState => ({
  admin: createAdminInitState()
})

export const adminState = createReducer(
  createAdminInitState(),

  on(ADMIN_ACTIONS.getAuthAdmin, state => ({ ...state, inRequest: true })),
  on(ADMIN_ACTIONS.login, state => ({ ...state, inRequest: true })),
  on(ADMIN_ACTIONS.loginError, (state, { error }) => ({
    ...state,
    inRequest: false,
    inError: true,
    data: { admin: null, token: '', error }
  })),

  on(ADMIN_ACTIONS.saveToken, (state, { token }) => ({ ...state, data: { ...state.data, token } })),
  on(ADMIN_ACTIONS.saveAdmin, (state, { admin }) => ({
    ...state,
    inRequest: false,
    inError: false,
    data: { ...state.data, admin, error: null }
  })),

  on(ADMIN_ACTIONS.saveOperationsCount, (state, { operationsData }) => ({ ...state, inRequest: false, data: { ...state.data, operationsCountData: operationsData } })),
  on(ADMIN_ACTIONS.saveOperationsSum, (state, { operationsData }) => ({ ...state, inRequest: false, data: { ...state.data, operationsSumData: operationsData } })),
  on(ADMIN_ACTIONS.saveOperationsWait, (state, { operationsWait }) => ({ ...state, inRequest: false, data: { ...state.data, operationsWait } })),
  on(ADMIN_ACTIONS.saveUsersCount, (state, { usersData }) => ({ ...state, inRequest: false, data: { ...state.data, usersCountData: usersData } })),
  on(ADMIN_ACTIONS.saveSubscribeLeft, (state, { subscribeLeft }) => ({ ...state, data: { ...state.data, subscribeLeft } })),

  on(ADMIN_ACTIONS.infoError, (state, { error }) => ({
    ...state,
    inRequest: false,
    inError: true,
    data: { ...state.data, error }
  })),

)

export const adminReducer = (state: IAdminState, action: Action): IAdminState => adminState(state, action)
