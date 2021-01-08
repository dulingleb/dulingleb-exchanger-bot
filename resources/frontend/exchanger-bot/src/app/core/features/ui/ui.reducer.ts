import { Action, createReducer, on } from '@ngrx/store'
import { UI_ACTIONS } from './ui.actions'

export const uiFeatureKey = 'UI exchanger bot'

export interface IUiState {
  isDarkTheme: boolean;
}

export const createUiInitState = (): IUiState => ({
  isDarkTheme: false
})

export interface IAppWithUiState {
  ui: IUiState;
}

export const createAppWithUiInitState = (): IAppWithUiState => ({
  ui: createUiInitState()
})

export const uiState = createReducer(
  createUiInitState(),

  on(UI_ACTIONS.saveThemeMode, (state, { isDarkTheme }) => ({ ...state, isDarkTheme })),

)

export const uiReducer = (state: IUiState, action: Action): IUiState => uiState(state, action)
