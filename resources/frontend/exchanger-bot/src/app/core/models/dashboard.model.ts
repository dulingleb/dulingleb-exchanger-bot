export enum EChartsPeriod {
  MONTH = 'month',
  WEEK = 'week'
}

export enum EChartsType {
  SUM = 'sum',
  COUNT = 'count'
}

export interface IDashboardChart {
  period: number;
  value: number;
}
