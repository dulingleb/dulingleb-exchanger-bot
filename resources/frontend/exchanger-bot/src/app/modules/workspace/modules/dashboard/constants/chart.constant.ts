import { ChartOptions } from 'chart.js'

export const CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { display: false },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
