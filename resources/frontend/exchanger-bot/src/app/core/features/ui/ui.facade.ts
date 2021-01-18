import { Injectable, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { UI_ACTIONS } from './ui.actions'
import { IAppWithUiState } from './ui.reducer'
import { IGlobalNotification } from './ui.model'
import { selectUiNotifications, selectUiShowSideNav, selectUiThemeMode } from './ui.selectors'

export interface IUiFacade {

  globalNotifications$: Observable<IGlobalNotification[]>;
  isDarkTheme$: Observable<boolean>;
  showSideNav$: Observable<boolean>;

  init(): void;
  changeThemeMode(isDarkTheme: boolean): void;
  toggleSideNav(): void;
  addNotification(notification: IGlobalNotification): void;
  closeNotification(notification: IGlobalNotification): void;
  clearNotifications(): void;

}

export const UI_FACADE = new InjectionToken<IUiFacade>('UI_FACADE')

@Injectable()
export class UiFacade {

  globalNotifications$ = this.store$.select(selectUiNotifications)
  isDarkTheme$ = this.store$.select(selectUiThemeMode)
  showSideNav$ = this.store$.select(selectUiShowSideNav)

  constructor(private store$: Store<IAppWithUiState>) {}

  init(): void {
    this.store$.dispatch(UI_ACTIONS.initUi())
  }

  changeThemeMode(isDarkTheme: boolean): void {
    this.store$.dispatch(UI_ACTIONS.changeThemeMode({ isDarkTheme }))
  }

  toggleSideNav(): void {
    this.store$.dispatch(UI_ACTIONS.toggleSideNav())
  }

  addNotification(notification: IGlobalNotification): void {
    this.store$.dispatch(UI_ACTIONS.addNotification({ notification }))
  }

  closeNotification(notification: IGlobalNotification): void {
    this.store$.dispatch(UI_ACTIONS.closeNotification({ notification }))
  }

  clearNotifications(): void {
    this.store$.dispatch(UI_ACTIONS.clearNotifications())
  }

}
