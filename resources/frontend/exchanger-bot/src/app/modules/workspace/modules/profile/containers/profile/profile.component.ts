import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { EUserRoleDto, IUiFacade, IUserFacade, IUserInDto, UI_FACADE, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: IUserInDto
  inRequest: boolean
  EUserRoleDto = EUserRoleDto

  private destroy$ = new Subject()

  constructor(
    private adminApiService: AdminApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    @Inject(USER_FACADE) private userFacade: IUserFacade,
  ) {}

  ngOnInit(): void {
    this.inRequest = true
    this.userFacade.user$.pipe(
      mergeMap(user => this.adminApiService.getUser(+user.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (user) =>  {
        this.user = user
      },
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
