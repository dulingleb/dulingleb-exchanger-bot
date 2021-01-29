import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { LocalStorageService } from '@core/services'
import { AdminApiService } from '@core/api/admin.api.service'

import { USER_ACTIONS } from './user.actions'

@Injectable()
export class UserEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private adminApiService: AdminApiService,
    private localStorageService: LocalStorageService
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.init),
    mergeMap(() => {
      const token = this.localStorageService.getToken()
      return [
        USER_ACTIONS.saveToken({ token }),
        USER_ACTIONS.getAuthUser({ token })
      ]
    })
  ))

  getAuthUser$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.getAuthUser),
    mergeMap(() => this.adminApiService.getAuthUser().pipe(
      map(user => USER_ACTIONS.saveUser({ user })),
      catchError(error => [USER_ACTIONS.loginError({ error })])
    ))
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.login),
    mergeMap(({ email, password }) => this.adminApiService.login(email, password).pipe(
      map(userData => USER_ACTIONS.loginSuccess({ userData })),
      catchError(error => [USER_ACTIONS.loginError({ error })])
    ))
  ))

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.loginSuccess),
    mergeMap(({ userData }) => [
        USER_ACTIONS.saveToken({ token: userData.accessToken }),
        USER_ACTIONS.saveUser({ user: userData.user }),
        USER_ACTIONS.redirectAfterAuth()
      ])
  ))

  saveToken$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.saveToken),
    map(({ token }) => this.localStorageService.saveToken(token))
  ), { dispatch: false })

  redirectAfterAuth$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.redirectAfterAuth),
    map(() => this.router.navigateByUrl('/'))
  ), { dispatch: false })

  redirectAfterLogout$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.redirectAfterLogout),
    map(() => this.router.navigateByUrl('/auth'))
  ), { dispatch: false })

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(USER_ACTIONS.logout),
    mergeMap(() => [
      USER_ACTIONS.saveToken({ token: '' }),
      USER_ACTIONS.saveUser({ user: null }),
      USER_ACTIONS.redirectAfterLogout()
    ])
  ))
}
