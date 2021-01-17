import { Injectable, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IUserInDto } from './user.model'
import { USER_ACTIONS } from './user.actions'
import { IAppWithUserState } from './user.reducer'
import { selectUser, selectUserError, selectUserInError, selectUserInRequest } from './user.selectors'

export interface IUserFacade {

  inRequest$: Observable<boolean>;
  inError$: Observable<boolean>;
  error$: Observable<Error>;
  user$: Observable<IUserInDto>;

  login(email: string, password: string): void;

}

export const USER_FACADE = new InjectionToken<IUserFacade>('USER_FACADE')

@Injectable()
export class UserFacade {

  inRequest$ = this.store$.select(selectUserInRequest)
  inError$ = this.store$.select(selectUserInError)
  error$ = this.store$.select(selectUserError)
  user$ = this.store$.select(selectUser)

  constructor(private store$: Store<IAppWithUserState>) {}

  login(email: string, password: string): void {
    this.store$.dispatch(USER_ACTIONS.login({ email, password }))
  }

}
