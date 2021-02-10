import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { IAdminFacade, ADMIN_FACADE, IUiFacade, UI_FACADE } from '@core/features'
import { SettingApiService } from '@core/api'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  inRequest: boolean
  status: boolean

  private destroy$ = new Subject()

  constructor(
    public settingApiService: SettingApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade
  ) {}

  ngOnInit(): void {
    this.inRequest = true
    this.settingApiService.getStatus().pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (status) => this.status = status,
      (err) => this.uiFacade.addErrorNotification(err.message)
    )

    this.adminFacade.subscribeLeft$.pipe(takeUntil(this.destroy$)).subscribe(subscribeLeft => {
      if (subscribeLeft === 7) {
        this.uiFacade.showSevenDaysPopup()
      }
    })
  }

  changeStatus(): void {
    this.inRequest = true
    this.settingApiService.changeStatus().pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (status) => this.status = status,
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
