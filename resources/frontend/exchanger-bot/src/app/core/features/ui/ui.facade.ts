import { Injectable, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { UI_ACTIONS } from './ui.actions'
import { IAppWithUiState } from './ui.reducer'
import { selectUiShowSideNav, selectUiThemeMode } from './ui.selectors'

export interface IUiFacade {

  isDarkTheme$: Observable<boolean>;
  showSideNav$: Observable<boolean>;

  initUi(): void;
  changeThemeMode(isDarkTheme: boolean): void;
  toggleSideNav(): void;

}

export const UI_FACADE = new InjectionToken<IUiFacade>('UI_FACADE')

@Injectable()
export class UiFacade {

  isDarkTheme$ = this.store$.select(selectUiThemeMode)
  showSideNav$ = this.store$.select(selectUiShowSideNav)

  constructor(private store$: Store<IAppWithUiState>) {}

  initUi(): void {
    this.store$.dispatch(UI_ACTIONS.initUi())
  }

  changeThemeMode(isDarkTheme: boolean): void {
    this.store$.dispatch(UI_ACTIONS.changeThemeMode({ isDarkTheme }))
  }

  toggleSideNav(): void {
    this.store$.dispatch(UI_ACTIONS.toggleSideNav())
  }

}
