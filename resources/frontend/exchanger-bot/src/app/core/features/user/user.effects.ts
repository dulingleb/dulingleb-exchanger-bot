import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

import { LocalStorageService } from '@core/services'

import { USER_ACTIONS } from './user.actions'
import { UserService } from './user.service'

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.login),
    mergeMap(({ email, password }) => this.userService.login(email, password).pipe(
      map(userData => USER_ACTIONS.loginSuccess({ userData })),
      catchError(error => [USER_ACTIONS.loginError({ error })])
    ))
  ))

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.loginSuccess),
    tap(({ userData }) => this.localStorageService.saveToken(userData.accessToken))
  ), { dispatch: false })
}
