import { createAction, props } from '@ngrx/store'

import { ISnackBar } from '@ui/snack-bar'

import { ELanguage } from './ui.model'

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

const changeLanguage = createAction(
  '[UI exchanger bot] Change language'
)

const saveLanguage = createAction(
  '[UI exchanger bot] Save language',
  props<{ language: ELanguage }>()
)

const toggleSideNav = createAction(
  '[UI exchanger bot] Toggle side nav'
)

const addNotification = createAction(
  '[UI banner admin] Add Notification',
  props<{ snackBarData: ISnackBar }>()
)

const addErrorNotification = createAction(
  '[UI banner admin] Add Error Notification',
  props<{
    messageI18n?: string;
    messageKeyI18n?: { [key: string]: string };
  }>()
)

const addInfoNotification = createAction(
  '[UI banner admin] Add Info Notification',
  props<{
    messageI18n?: string;
    messageKeyI18n?: { [key: string]: string };
  }>()
)

const showSevenDaysPopup = createAction(
  '[UI exchanger bot] show seven days popup'
)

export const UI_ACTIONS = {
  initUi,
  changeThemeMode,
  saveThemeMode,
  changeLanguage,
  saveLanguage,
  toggleSideNav,

  addNotification,
  addErrorNotification,
  addInfoNotification,
  showSevenDaysPopup,
}
