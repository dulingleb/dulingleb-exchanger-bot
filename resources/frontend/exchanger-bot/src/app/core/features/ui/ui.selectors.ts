import { createFeatureSelector, createSelector } from '@ngrx/store'

import { IUiState, uiFeatureKey } from './ui.reducer'

export const selectUi = createFeatureSelector<IUiState>(uiFeatureKey)

export const selectUiThemeMode = createSelector(
  [selectUi],
  state => state.isDarkTheme
)

export const selectUiShowSideNav = createSelector(
  [selectUi],
  state => state.showSideNav
)

export const selectUiNotifications = createSelector(
  [selectUi],
  state => state.notifications
)
