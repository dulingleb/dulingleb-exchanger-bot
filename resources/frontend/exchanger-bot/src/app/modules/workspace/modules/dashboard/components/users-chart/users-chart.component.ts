import { Component, EventEmitter, Input, Output, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { debounceTime, filter, mergeMap, map, takeUntil } from 'rxjs/operators'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Label } from 'ng2-charts'

import { EChartsPeriod } from '../../models'

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss']
})
export class UsersChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() inRequest: boolean
  @Input() period: EChartsPeriod
  @Input() usersCharts: { [key: number]: number }

  @Output() changePeriod = new EventEmitter<EChartsPeriod>()

  EChartsPeriod = EChartsPeriod

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false }
  }
  barChartLabels: Label[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartPlugins = []

  barChartData: ChartDataSets[] = []

  chartData$ = new BehaviorSubject<{ [key: number]: number }>(null)
  private destroy$ = new Subject()

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.chartData$.pipe(
      debounceTime(500),
      filter(data => !!data),
      mergeMap(lineChartData => this.translateService.get(this.getPeriodTranslateKey()).pipe(
        map(translate => ({ lineChartData, translate }))
      )),
      takeUntil(this.destroy$)
    ).subscribe(({ lineChartData, translate }) => {
      this.getLineChartLabels(lineChartData, translate)
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

  private getLineChartLabels(lineChartData: { [key: number]: number }, translate: { [key: number]: string }): void {
    const barChartLabels = []
    const data = []
    for (const key of Object.keys(lineChartData)) {
      barChartLabels.push(translate[+key])
      data.push(lineChartData[key])
    }
    this.barChartLabels = barChartLabels
    this.barChartData = [{ data }]
  }

  private getPeriodTranslateKey(): string {
    return `common.${this.period === EChartsPeriod.MONTH ? 'month': 'week'}`
  }

}
