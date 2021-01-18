import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { map, skipWhile, withLatestFrom } from 'rxjs/operators'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { IUserFacade, USER_FACADE } from '@core/features'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(USER_FACADE) private userFacade: IUserFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.userFacade.inRequest$.pipe(
      skipWhile(inRequest => inRequest),
      withLatestFrom(this.userFacade.user$),
      map(([, user]) => {
        if (!user) { return true }

        this.router.navigateByUrl('/')
        return false
      })
    )
  }
}
