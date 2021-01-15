import { createAction, props } from '@ngrx/store'

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

export const UI_ACTIONS = {
  initUi,
  changeThemeMode,
  saveThemeMode,
  toggleSideNav
}
