import { Injectable, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { IAdminInDto } from './admin.model'
import { ADMIN_ACTIONS } from './admin.actions'
import { IAppWithAdminState } from './admin.reducer'
import { IAdminOperationsCountInfoInDto, IAdminOperationsSumInfoInDto, IAdminUsersCountInfoInDto } from './admin.info.model'
import {
  selectToken,
  selectAdmin,
  selectAdminError,
  selectAdminInError,
  selectAdminInRequest,
  selectUsersCountData,
  selectOperationsSumData,
  selectOperationsWaitData,
  selectOperationsCountData,
} from './admin.selectors'

export interface IAdminFacade {

  inRequest$: Observable<boolean>;
  inError$: Observable<boolean>;
  admin$: Observable<IAdminInDto>;
  token$: Observable<string>;
  error$: Observable<Error>;

  operationCountData$: Observable<IAdminOperationsCountInfoInDto>;
  operationsSumData$: Observable<IAdminOperationsSumInfoInDto>;
  operationsWait$: Observable<number>;
  usersCountData$: Observable<IAdminUsersCountInfoInDto>;

  init(): void;
  login(email: string, password: string): void;
  logout(): void;

}

export const ADMIN_FACADE = new InjectionToken<IAdminFacade>('ADMIN_FACADE')

@Injectable()
export class AdminFacade {

  inRequest$ = this.store$.select(selectAdminInRequest)
  inError$ = this.store$.select(selectAdminInError)
  error$ = this.store$.select(selectAdminError)
  token$ = this.store$.select(selectToken)
  admin$ = this.store$.select(selectAdmin)

  operationCountData$ = this.store$.select(selectOperationsCountData)
  operationsSumData$ = this.store$.select(selectOperationsSumData)
  operationsWait$ = this.store$.select(selectOperationsWaitData)
  usersCountData$ = this.store$.select(selectUsersCountData)

  constructor(private store$: Store<IAppWithAdminState>) {}

  init(): void {
    this.store$.dispatch(ADMIN_ACTIONS.init())
  }

  login(email: string, password: string): void {
    this.store$.dispatch(ADMIN_ACTIONS.login({ email, password }))
  }

  logout(): void {
    this.store$.dispatch(ADMIN_ACTIONS.logout())
  }

}
