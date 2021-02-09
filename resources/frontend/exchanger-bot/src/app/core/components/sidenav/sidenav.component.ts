import { ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core'
import { Component, Inject } from '@angular/core'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { EAdminRoleDto, IAdminFacade, ADMIN_FACADE } from '@core/features'
import { APP_COMMON } from '@const/app.constant'

@Component({
  selector: 'app-side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit, OnDestroy {

  EUserRoleDto = EAdminRoleDto
  APP_COMMON = APP_COMMON

  subscribeLeft: number = null

  private destroy$ = new Subject()

  constructor(@Inject(ADMIN_FACADE) public adminFacade: IAdminFacade) {}

  ngOnInit(): void {
    this.adminFacade.admin$.pipe(takeUntil(this.destroy$)).subscribe(admin => {
      const subscribe = admin?.subscribe
      if (!subscribe.getMonth) {
        this.subscribeLeft = null
        return
      }

      const diffTime = Math.abs(subscribe.getTime() - (new Date()).getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      this.subscribeLeft = diffDays < 0 ? 0 : diffDays
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
