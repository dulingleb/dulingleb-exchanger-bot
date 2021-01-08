import { createFeatureSelector, createSelector } from '@ngrx/store'

import { IUiState, uiFeatureKey } from './ui.reducer'

export const selectUi = createFeatureSelector<IUiState>(uiFeatureKey)

export const selectUiThemeMode = createSelector(
  [selectUi],
  state => state.isDarkTheme
)
