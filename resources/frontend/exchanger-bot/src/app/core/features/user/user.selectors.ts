import { createFeatureSelector, createSelector } from '@ngrx/store'

import { IUserState, userFeatureKey } from './user.reducer'

export const selectUserState = createFeatureSelector<IUserState>(userFeatureKey)

export const selectUserInRequest = createSelector(
  [selectUserState],
  state => state.inRequest
)

export const selectUserInError = createSelector(
  [selectUserState],
  state => state.inError
)

export const selectUserData = createSelector(
  [selectUserState],
  state => state.data
)

export const selectUser = createSelector(
  [selectUserData],
  state => state.user
)

export const selectUserError = createSelector(
  [selectUserData],
  state => state.error
)
