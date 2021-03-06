import { Action, createReducer, on } from '@ngrx/store'

import { UI_ACTIONS } from './ui.actions'
import { APP_DEFAULT_LANGUAGE, ELanguage } from './ui.model'

export const uiFeatureKey = 'UI exchanger bot'

export interface IUiState {
  isDarkTheme: boolean;
  showSideNav: boolean;
  language: ELanguage;
}

export const createUiInitState = (): IUiState => ({
  isDarkTheme: false,
  showSideNav: true,
  language: APP_DEFAULT_LANGUAGE
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
  on(UI_ACTIONS.saveLanguage, (state, { language }) => ({ ...state, language })),
  on(UI_ACTIONS.toggleSideNav, state => ({ ...state, showSideNav: !state.showSideNav })),

)

export const uiReducer = (state: IUiState, action: Action): IUiState => uiState(state, action)
