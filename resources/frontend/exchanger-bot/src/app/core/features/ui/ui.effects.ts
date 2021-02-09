import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { debounceTime, map, tap } from 'rxjs/operators'

import { APP_COMMON } from '@const/app.constant'
import { LocalStorageService } from '@core/services'
import { SevenDaysModalService } from '@ui/seven-days-modal'
import { ESnackBarType, SnackBarService } from '@ui/snack-bar'

import { UI_ACTIONS } from './ui.actions'

@Injectable()
export class UiEffects {

  constructor(
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private localStorageService: LocalStorageService,
    private sevenDaysModalService: SevenDaysModalService,
  ) {}

  initUi$ = createEffect(() => this.actions$.pipe(
    ofType(UI_ACTIONS.initUi),
    map(() => {
      const isDarkTheme = this.localStorageService.isDarkTheme()
      return UI_ACTIONS.saveThemeMode({ isDarkTheme })
    })
  ))

  changeThemeMode$ = createEffect(() => this.actions$.pipe(
    ofType(UI_ACTIONS.changeThemeMode),
    map(({ isDarkTheme }) => {
      this.localStorageService.changeThemeMode(isDarkTheme)
      return UI_ACTIONS.saveThemeMode({ isDarkTheme })
    })
  ))

  addErrorNotification$ = createEffect(() => this.actions$.pipe(
    ofType(UI_ACTIONS.addErrorNotification),
    map(({ messageI18n, messageKeyI18n }) => UI_ACTIONS.addNotification({
      snackBarData: {
        messageI18n,
        messageKeyI18n,
        type: ESnackBarType.ERROR
      }
    }))
  ))

  addInfoNotification$ = createEffect(() => this.actions$.pipe(
    ofType(UI_ACTIONS.addInfoNotification),
    map(({ messageI18n, messageKeyI18n }) => UI_ACTIONS.addNotification({
      snackBarData: {
        messageI18n,
        messageKeyI18n,
        type: ESnackBarType.INFO
      }
    }))
  ))

  showSevenDaysPopup$ = createEffect(() => this.actions$.pipe(
    ofType(UI_ACTIONS.showSevenDaysPopup),
    debounceTime(APP_COMMON.sevenDaysPopupDelay),
    tap(() => {
      if (!this.localStorageService.isShowedSevenDaysPopup()) {
        this.sevenDaysModalService.openDialog()
        this.localStorageService.saveSevenDaysPopup()
      }
    })
  ), { dispatch: false })

  addNotification$ = createEffect(() => this.actions$.pipe(
    ofType(UI_ACTIONS.addNotification),
    map(({ snackBarData }) => this.snackBarService.openSnackBar(snackBarData))
  ), { dispatch: false })

}
