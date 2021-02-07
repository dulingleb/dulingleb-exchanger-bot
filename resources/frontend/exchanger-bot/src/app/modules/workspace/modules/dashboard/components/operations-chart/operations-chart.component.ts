import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core'
import { debounceTime, filter, map, mergeMap, takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { ChartDataSets, ChartOptions } from 'chart.js'
import { BehaviorSubject, Subject } from 'rxjs'
import { Color, Label } from 'ng2-charts'

import { EChartsPeriod, EChartsType } from '../../models'

@Component({
  selector: 'app-operations-chart',
  templateUrl: './operations-chart.component.html',
  styleUrls: ['./operations-chart.component.scss']
})
export class OperationsChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input() inRequest: boolean
  @Input() type: EChartsType
  @Input() period: EChartsPeriod
  @Input() operationsCharts: { [key: number]: number }
  @Output() changeType = new EventEmitter<EChartsType>()
  @Output() changePeriod = new EventEmitter<EChartsPeriod>()

  EChartsType = EChartsType
  EChartsPeriod = EChartsPeriod

  lineChartData: ChartDataSets[] = []

  lineChartLabels: Label[] = []

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false }
  }

  lineChartColors: Color[] = [
    {
      borderColor: '#464646',
      backgroundColor: 'rgba(103, 58, 183, 0.8)',
    },
  ]

  lineChartLegend = true
  lineChartPlugins = []
  lineChartType = 'line'

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

    if (this.operationsCharts && this.type && this.period) {
      this.chartData$.next(this.operationsCharts)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private getLineChartLabels(lineChartData: { [key: number]: number }, translate: { [key: number]: string }): void {
    const lineChartLabels = []
    const data = []
    for (const key of Object.keys(lineChartData)) {
      lineChartLabels.push(translate[+key])
      data.push(lineChartData[key])
    }
    this.lineChartLabels = lineChartLabels
    this.lineChartData = [{ data }]
  }

  private getPeriodTranslateKey(): string {
    return `common.${this.period === EChartsPeriod.MONTH ? 'month': 'week'}`
  }

}
