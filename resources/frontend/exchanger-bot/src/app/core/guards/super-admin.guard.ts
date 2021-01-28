import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { map, skipWhile, withLatestFrom } from 'rxjs/operators'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { EUserRoleDto, IUserFacade, USER_FACADE } from '@core/features'

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(USER_FACADE) private userFacade: IUserFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return this.userFacade.inRequest$.pipe(
      skipWhile(inRequest => inRequest),
      withLatestFrom(this.userFacade.user$),
      map(([, user]) => {
        if (user?.role === EUserRoleDto.SUPER_ADMIN) { return true }

        this.router.navigateByUrl('/')
        return false
      })
    )
  }
}
