import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { catchError, first, mergeMap } from 'rxjs/operators'
import { throwError } from 'rxjs'

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
            catchError(error => {
              const handleError = this.handleError(error)
              if (handleError.statusCode === 422) {
                this.adminFacade.logout()
              }
              return throwError(handleError)
            })
          )
        })
      )
    }

    private handleError(error: HttpErrorResponse): ICommonResponseDto<null> {
      const res: ICommonResponseDto<null> = {
        status: false,
        message: error.error?.message || error.message,
        statusCode: error.status
      }
      return res
    }
}
