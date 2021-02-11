import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { EAdminRoleDto, IUiFacade, IAdminFacade, IAdminInDto, UI_FACADE, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: IAdminInDto
  inRequest: boolean
  EUserRoleDto = EAdminRoleDto

  private destroy$ = new Subject()

  constructor(
    private adminApiService: AdminApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    @Inject(ADMIN_FACADE) private adminFacade: IAdminFacade,
  ) {}

  ngOnInit(): void {
    this.inRequest = true
    this.adminFacade.admin$.pipe(
      mergeMap(user => this.adminApiService.getAdmin(+user.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (user) =>  this.user = user,
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
