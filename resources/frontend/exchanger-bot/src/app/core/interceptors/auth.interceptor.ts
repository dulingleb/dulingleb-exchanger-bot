import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { first, mergeMap } from 'rxjs/operators'

import { IUserFacade, USER_FACADE } from '@core/features'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(@Inject(USER_FACADE) private userFacade: IUserFacade) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): any {

      return this.userFacade.token$.pipe(
        first(),
        mergeMap(token => {
          req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
          })
          return next.handle(req)
        })
      )
    }
}
