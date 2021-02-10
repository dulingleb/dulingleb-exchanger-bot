import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { catchError, first, mergeMap } from 'rxjs/operators'
import { of, throwError } from 'rxjs'
import { camelCase } from 'lodash'

import { IAdminFacade, ADMIN_FACADE } from '@core/features'
import { ICommonResponseDto } from '@core/models'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(@Inject(ADMIN_FACADE) private adminFacade: IAdminFacade) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
      return this.adminFacade.token$.pipe(
        first(),
        mergeMap(token => {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
          return next.handle(req).pipe(
            mergeMap((res: any) => {
              if (res.body?.status !== undefined && !res.body.status) {
                return throwError({
                  error: {
                    errors: res.body.errors,
                    status: res.body.status,
                    message: res.body.message,
                  },
                  status: 422
                })
              }
              return of(res)
            }),
            catchError(error => {
              const handleError = this.handleError(error)
              if (handleError.statusCode === 401) {
                this.adminFacade.logout()
              }
              return throwError(handleError)
            })
          )
        })
      )
    }

    private handleError(error: HttpErrorResponse): ICommonResponseDto<null> {
      const rawErrors = error.error?.errors || {}
      const errors: { [key: string]: string[] } = {}
      for (const errKey of Object.keys(rawErrors)) {
        errors[camelCase(errKey)] = rawErrors[errKey]
      }
      const res: ICommonResponseDto<null> = {
        status: false,
        message: error.error?.message || error.message,
        statusCode: error.status,
        errors,
      }
      return res
    }
}
