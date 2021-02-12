import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core'
import { debounceTime, filter, map, mergeMap, takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { ChartDataSets, ChartOptions } from 'chart.js'
import { BehaviorSubject, Subject } from 'rxjs'
import { Color, Label } from 'ng2-charts'

import { EChartsPeriod, EChartsType, IDashboardChart } from '@core/models'

import { CHART_OPTIONS } from '../../constants'

@Component({
  selector: 'app-operations-chart',
  templateUrl: './operations-chart.component.html',
  styleUrls: ['./operations-chart.component.scss']
})
export class OperationsChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() inRequest: boolean
  @Input() type: EChartsType
  @Input() period: EChartsPeriod
  @Input() operationsCharts: IDashboardChart[]
  @Output() changeType = new EventEmitter<EChartsType>()
  @Output() changePeriod = new EventEmitter<EChartsPeriod>()

  EChartsType = EChartsType
  EChartsPeriod = EChartsPeriod

  chartData: ChartDataSets[] = []

  chartLabels: Label[] = []

  chartOptions: ChartOptions = CHART_OPTIONS
  chartColors: Color[] = [
    {
      borderColor: '#464646',
      backgroundColor: 'rgba(103, 58, 183, 0.8)',
    },
  ]

  chartPlugins = []
  chartType = 'line'

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

    if (this.operationsCharts && this.type && this.period) {
      this.chartData$.next(this.operationsCharts)
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
