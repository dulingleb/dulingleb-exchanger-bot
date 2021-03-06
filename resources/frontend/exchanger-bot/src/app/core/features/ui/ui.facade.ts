import { Injectable, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { ISnackBar } from '@ui/snack-bar'

import { ELanguage } from './ui.model'
import { UI_ACTIONS } from './ui.actions'
import { IAppWithUiState } from './ui.reducer'
import { selectUiLanguage, selectUiShowSideNav, selectUiThemeMode } from './ui.selectors'

export interface IUiFacade {

  isDarkTheme$: Observable<boolean>;
  showSideNav$: Observable<boolean>;
  language$: Observable<ELanguage>;

  init(): void;
  changeThemeMode(isDarkTheme: boolean): void;
  changeLanguage(): void;
  toggleSideNav(): void;
  showSevenDaysPopup(): void;
  addNotification(snackBarData: ISnackBar): void;
  addErrorNotification(messageI18n: string, messageKeyI18n?: { [key: string]: string }): void;
  addInfoNotification(messageI18n: string, messageKeyI18n?: { [key: string]: string }): void;

}

export const UI_FACADE = new InjectionToken<IUiFacade>('UI_FACADE')

@Injectable()
export class UiFacade {

  isDarkTheme$ = this.store$.select(selectUiThemeMode)
  showSideNav$ = this.store$.select(selectUiShowSideNav)
  language$ = this.store$.select(selectUiLanguage)

  constructor(private store$: Store<IAppWithUiState>) {}

  init(): void {
    this.store$.dispatch(UI_ACTIONS.initUi())
  }

  changeThemeMode(isDarkTheme: boolean): void {
    this.store$.dispatch(UI_ACTIONS.changeThemeMode({ isDarkTheme }))
  }

  changeLanguage(): void {
    this.store$.dispatch(UI_ACTIONS.changeLanguage())
  }

  toggleSideNav(): void {
    this.store$.dispatch(UI_ACTIONS.toggleSideNav())
  }

  showSevenDaysPopup(): void {
    this.store$.dispatch(UI_ACTIONS.showSevenDaysPopup())
  }

  addNotification(snackBarData: ISnackBar): void {
    this.store$.dispatch(UI_ACTIONS.addNotification({ snackBarData }))
  }

  addErrorNotification(messageI18n: string, messageKeyI18n: { [key: string]: string } = {}): void {
    this.store$.dispatch(UI_ACTIONS.addErrorNotification({ messageI18n, messageKeyI18n }))
  }

  addInfoNotification(messageI18n: string, messageKeyI18n: { [key: string]: string } = {}): void {
    this.store$.dispatch(UI_ACTIONS.addInfoNotification({ messageI18n, messageKeyI18n }))
  }

}
