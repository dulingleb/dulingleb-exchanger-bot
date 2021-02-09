import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { LocalStorageService } from '@core/services'
import { AdminApiService } from '@core/api/admin.api.service'

import { AdminInfoService } from './admin.info.service'
import { ADMIN_ACTIONS } from './admin.actions'
import { IAdminInDto } from './admin.model'

@Injectable()
export class AdminEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private adminApiService: AdminApiService,
    private adminInfoService: AdminInfoService,
    private localStorageService: LocalStorageService
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.init),
    mergeMap(() => {
      const token = this.localStorageService.getToken()
      return [
        ADMIN_ACTIONS.saveToken({ token }),
        ADMIN_ACTIONS.getAuthAdmin({ token })
      ]
    })
  ))

  getAuthAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.getAuthAdmin),
    mergeMap(() => this.adminApiService.getAuthAdmin().pipe(
      map(admin => ADMIN_ACTIONS.saveAdmin({ admin })),
      catchError(error => [ADMIN_ACTIONS.loginError({ error })])
    ))
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.login),
    mergeMap(({ email, password }) => this.adminApiService.login(email, password).pipe(
      map(adminData => ADMIN_ACTIONS.loginSuccess({ adminData })),
      catchError(error => [ADMIN_ACTIONS.loginError({ error })])
    ))
  ))

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.loginSuccess),
    mergeMap(({ adminData }) => [
        ADMIN_ACTIONS.saveToken({ token: adminData.accessToken }),
        ADMIN_ACTIONS.saveAdmin({ admin: adminData.user }),
        ADMIN_ACTIONS.redirectAfterAuth()
      ])
  ))

  saveAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.saveAdmin),
    mergeMap(({ admin }) => admin
        ? [
          ADMIN_ACTIONS.saveSubscribeLeft({ subscribeLeft: this.getAdminSubscribeLeft(admin) }),
          ADMIN_ACTIONS.getOperationsCount(),
          ADMIN_ACTIONS.getOperationsWait(),
          ADMIN_ACTIONS.getOperationsSum(),
          ADMIN_ACTIONS.getUsersCount()
        ]
        : [
          ADMIN_ACTIONS.saveSubscribeLeft({ subscribeLeft: this.getAdminSubscribeLeft(admin) }),
        ]
    )
  ))

  saveToken$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.saveToken),
    map(({ token }) => this.localStorageService.saveToken(token))
  ), { dispatch: false })

  redirectAfterAuth$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.redirectAfterAuth),
    map(() => this.router.navigateByUrl('/'))
  ), { dispatch: false })

  redirectAfterLogout$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.redirectAfterLogout),
    map(() => this.router.navigateByUrl('/auth'))
  ), { dispatch: false })

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.logout),
    mergeMap(() => [
      ADMIN_ACTIONS.saveToken({ token: '' }),
      ADMIN_ACTIONS.saveAdmin({ admin: null }),
      ADMIN_ACTIONS.redirectAfterLogout()
    ])
  ))

  getOperationsCount$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.getOperationsCount),
    mergeMap(() => this.adminInfoService.getOperationsCount().pipe(
      map(operationsData => ADMIN_ACTIONS.saveOperationsCount({ operationsData })),
      catchError(error => [ADMIN_ACTIONS.infoError({ error })])
    ))
  ))

  getOperationsSum$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.getOperationsSum),
    mergeMap(() => this.adminInfoService.getOperationsSum().pipe(
      map(operationsData => ADMIN_ACTIONS.saveOperationsSum({ operationsData })),
      catchError(error => [ADMIN_ACTIONS.infoError({ error })])
    ))
  ))

  getOperationsWait$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.getOperationsWait),
    mergeMap(() => this.adminInfoService.getOperationsWait().pipe(
      map(operationsWait => ADMIN_ACTIONS.saveOperationsWait({ operationsWait })),
      catchError(error => [ADMIN_ACTIONS.infoError({ error })])
    ))
  ))

  getUsersCount$ = createEffect(() => this.actions$.pipe(
    ofType(ADMIN_ACTIONS.getUsersCount),
    mergeMap(() => this.adminInfoService.getUsersCount().pipe(
      map(usersData => ADMIN_ACTIONS.saveUsersCount({ usersData })),
      catchError(error => [ADMIN_ACTIONS.infoError({ error })])
    ))
  ))

  private getAdminSubscribeLeft(admin: IAdminInDto): number {
      const subscribe = admin?.subscribe
      if (subscribe === null) {
        return Infinity
      }

      if (!subscribe?.getMonth) {
        return null
      }

      const diffTime = Math.abs(subscribe.getTime() - (new Date()).getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return diffDays < 0 ? 0 : diffDays
  }

}
