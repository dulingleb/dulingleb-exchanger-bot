import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ISettingRequisiteDto } from '@core/models'

@Component({
  selector: 'app-settings-requisite-info',
  templateUrl: './settings-requisite-info.component.html',
})
export class SettingsRequisiteInfoComponent implements OnInit, OnDestroy {

  requisite: ISettingRequisiteDto
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    private settingApiService: SettingApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.settingApiService.getRequisite(+params.get('id'))),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (requisite) =>  {
        this.requisite = requisite
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
