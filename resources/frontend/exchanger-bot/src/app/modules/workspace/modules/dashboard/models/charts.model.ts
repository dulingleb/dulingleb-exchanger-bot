import { EChartsPeriod, EChartsType } from '@core/models'

export interface IOperationChartSettings {
  type: EChartsType;
  period: EChartsPeriod;
}

export interface IUserChartSettings {
  period: EChartsPeriod;
}
