import { createFeatureSelector, createSelector } from '@ngrx/store'

import { IAdminState, adminFeatureKey } from './admin.reducer'

export const selectAdminState = createFeatureSelector<IAdminState>(adminFeatureKey)

export const selectAdminInRequest = createSelector(
  [selectAdminState],
  state => state.inRequest
)

export const selectAdminInError = createSelector(
  [selectAdminState],
  state => state.inError
)

export const selectAdminData = createSelector(
  [selectAdminState],
  state => state.data
)

export const selectAdmin = createSelector(
  [selectAdminData],
  state => state.admin
)

export const selectToken = createSelector(
  [selectAdminData],
  state => state.token
)

export const selectAdminError = createSelector(
  [selectAdminData],
  state => state.error
)

export const selectOperationsCountData = createSelector(
  [selectAdminData],
  state => state.operationsCountData
)

export const selectOperationsSumData = createSelector(
  [selectAdminData],
  state => state.operationsSumData
)

export const selectOperationsWaitData = createSelector(
  [selectAdminData],
  state => state.operationsWait
)

export const selectUsersCountData = createSelector(
  [selectAdminData],
  state => state.usersCountData
)

export const selectSubscribeLeft = createSelector(
  [selectAdminData],
  state => state.subscribeLeft
)
