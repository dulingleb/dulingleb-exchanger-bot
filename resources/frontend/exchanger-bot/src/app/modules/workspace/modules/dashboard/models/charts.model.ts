export enum EChartsPeriod {
  MONTH = 'month',
  WEEK = 'week'
}

export enum EChartsType {
  SUM = 'sum',
  COUNT = 'count'
}

export interface IOperationChartSettings {
  type: EChartsType;
  period: EChartsPeriod;
}

export interface IUserChartSettings {
  period: EChartsPeriod;
}
