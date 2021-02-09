import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { map, skipWhile, withLatestFrom } from 'rxjs/operators'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { EAdminRoleDto, IAdminFacade, ADMIN_FACADE } from '@core/features'

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(ADMIN_FACADE) private adminFacade: IAdminFacade
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return this.adminFacade.inRequest$.pipe(
      skipWhile(inRequest => inRequest),
      withLatestFrom(this.adminFacade.admin$),
      map(([, user]) => {
        if (user?.role === EAdminRoleDto.SUPER_ADMIN) { return true }

        this.router.navigateByUrl('/')
        return false
      })
    )
  }
}
