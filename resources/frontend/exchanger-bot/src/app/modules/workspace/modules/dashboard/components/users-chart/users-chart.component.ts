import { Component, EventEmitter, Input, Output, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { debounceTime, filter, mergeMap, map, takeUntil } from 'rxjs/operators'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Label } from 'ng2-charts'

import { EChartsPeriod, EChartsType, IDashboardChart } from '@core/models'

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss']
})
export class UsersChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() inRequest: boolean
  @Input() period: EChartsPeriod
  @Input() usersCharts: IDashboardChart[]

  @Output() changePeriod = new EventEmitter<EChartsPeriod>()

  EChartsPeriod = EChartsPeriod

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false }
  }
  chartLabels: Label[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartPlugins = []

  chartData: ChartDataSets[] = []

  chartData$ = new BehaviorSubject<IDashboardChart[]>(null)
  private destroy$ = new Subject()

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.chartData$.pipe(
      debounceTime(500),
      filter(data => !!data),
      mergeMap(chartData => this.translateService.get(this.getPeriodTranslateKey()).pipe(
        map(translate => ({ chartData, translate }))
      )),
      takeUntil(this.destroy$)
    ).subscribe(({ chartData, translate }) => {
      this.getLineChartLabels(chartData, translate)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inRequest && Object.keys(changes).length === 1) { return }

    if (this.usersCharts && this.period) {
      this.chartData$.next(this.usersCharts)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private getLineChartLabels(chartData: IDashboardChart[], translate: { [key: number]: string }): void {
    const chartLabels = []
    const data = []
    for (const cData of chartData){
      chartLabels.push(translate[cData.period])
      data.push(cData.value)
    }
    this.chartLabels = chartLabels
    this.chartData = [{ data }]
  }

  private getPeriodTranslateKey(): string {
    return `common.${this.period === EChartsPeriod.MONTH ? 'month': 'week'}`
  }

}
