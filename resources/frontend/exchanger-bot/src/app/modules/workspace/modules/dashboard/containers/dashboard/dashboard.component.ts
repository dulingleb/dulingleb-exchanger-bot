import { Component, OnInit, OnDestroy, Inject } from '@angular/core'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { DashboardApiService } from '@core/api'
import { UI_FACADE, IUiFacade } from '@core/features'
import { EChartsPeriod, EChartsType, IDashboardChart } from '@core/models'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  inRequest: boolean

  typeOperations = EChartsType.COUNT
  periodOperations = EChartsPeriod.WEEK
  periodUsers = EChartsPeriod.WEEK

  operationsCharts: IDashboardChart[]
  usersCharts: IDashboardChart[]

  private destroy$ = new Subject()

  constructor(
    private dashboardApiService: DashboardApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
  ) {}

  ngOnInit(): void {
    this.getOperations()
    this.getUsers()
  }

  changeTypeOperations(type: EChartsType): void {
    this.typeOperations = type
    this.getOperations()
  }

  changePeriodOperations(period: EChartsPeriod): void {
    this.periodOperations = period
    this.getOperations()
  }

  changePeriodUsers(period: EChartsPeriod): void {
    this.periodUsers = period
    this.getUsers()
  }

  getOperations(): void {
    this.inRequest = true
    this.dashboardApiService.getOperations(this.typeOperations, this.periodOperations).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (operations) => this.operationsCharts = operations,
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  getUsers(): void {
    this.inRequest = true
    this.dashboardApiService.getUsers(this.periodUsers).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (users) => this.usersCharts = users,
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
