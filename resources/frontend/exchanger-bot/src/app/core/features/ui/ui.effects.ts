import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs/operators'

import { UI_ACTIONS } from './ui.actions'
import { LocalStorageService } from '@core/services'

@Injectable()
export class UiEffects {

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
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

}
