import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { catchError, first, mergeMap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'

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
            catchError(this.handleError)
          )
        })
      )
    }

    private handleError(error: HttpErrorResponse): Observable<ICommonResponseDto<null>> {
      const res: ICommonResponseDto<null> = {
        status: false,
        message: error.error.massage || error.message,
        statusCode: error.status
      }
      return throwError(res)
    }
}
