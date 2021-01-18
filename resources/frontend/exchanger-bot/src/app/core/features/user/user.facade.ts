import { Injectable, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IUserInDto } from './user.model'
import { USER_ACTIONS } from './user.actions'
import { IAppWithUserState } from './user.reducer'
import { selectToken, selectUser, selectUserError, selectUserInError, selectUserInRequest } from './user.selectors'

export interface IUserFacade {

  inRequest$: Observable<boolean>;
  inError$: Observable<boolean>;
  user$: Observable<IUserInDto>;
  token$: Observable<string>;
  error$: Observable<Error>;

  init(): void;
  login(email: string, password: string): void;

}

export const USER_FACADE = new InjectionToken<IUserFacade>('USER_FACADE')

@Injectable()
export class UserFacade {

  inRequest$ = this.store$.select(selectUserInRequest)
  inError$ = this.store$.select(selectUserInError)
  error$ = this.store$.select(selectUserError)
  token$ = this.store$.select(selectToken)
  user$ = this.store$.select(selectUser)

  constructor(private store$: Store<IAppWithUserState>) {}

  init(): void {
    this.store$.dispatch(USER_ACTIONS.init())
  }

  login(email: string, password: string): void {
    this.store$.dispatch(USER_ACTIONS.login({ email, password }))
  }

}
