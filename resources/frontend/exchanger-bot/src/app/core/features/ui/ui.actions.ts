import { createAction, props } from '@ngrx/store'

import { IGlobalNotification } from './ui.model'

const initUi = createAction(
  '[UI exchanger bot] Init UI'
)

const changeThemeMode = createAction(
  '[UI exchanger bot] Change theme mode',
  props<{ isDarkTheme: boolean }>()
)

const saveThemeMode = createAction(
  '[UI exchanger bot] Save theme mode',
  props<{ isDarkTheme: boolean }>()
)

const toggleSideNav = createAction(
  '[UI exchanger bot] Toggle side nav'
)

const addNotification = createAction(
  '[UI banner admin] Add Notification',
  props<{ notification: IGlobalNotification }>()
)

const closeNotification = createAction(
  '[UI banner admin] Close Notification',
  props<{ notification: IGlobalNotification }>()
)

const clearNotifications = createAction(
  '[UI banner admin] Clear Notifications'
)

export const UI_ACTIONS = {
  initUi,
  changeThemeMode,
  saveThemeMode,
  toggleSideNav,

  addNotification,
  closeNotification,
  clearNotifications
}
