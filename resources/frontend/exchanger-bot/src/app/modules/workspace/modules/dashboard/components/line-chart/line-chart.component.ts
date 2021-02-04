import { Component, AfterViewInit } from '@angular/core'
import { ChartDataSets, ChartOptions } from 'chart.js'
import { Color, Label } from 'ng2-charts'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {

  isInit = false

  lineChartData: ChartDataSets[] = []

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June']

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
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


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lineChartData.push({ data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' })
      this.isInit = true
    }, 1000)
  }

}
