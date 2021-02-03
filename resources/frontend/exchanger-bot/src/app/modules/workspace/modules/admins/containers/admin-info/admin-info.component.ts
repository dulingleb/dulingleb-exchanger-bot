import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { EAdminRoleDto, IUiFacade, IAdminInDto, UI_FACADE } from '@core/features'

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
})
export class AdminInfoComponent implements OnInit, OnDestroy {

  user: IAdminInDto
  inRequest: boolean
  EUserRoleDto = EAdminRoleDto

  private destroy$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    private adminApiService: AdminApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.adminApiService.getAdmin(+params.get('id'))),
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
