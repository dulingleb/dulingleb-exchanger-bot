export interface IFilterField {
  labelI18n: string;
  name: string;
  type?: EFilterType;
  options?: {
    value: string | number | boolean;
    titleI18n: string;
    class?: string;
  }[];
}

export interface IFilterValues {
  name: string;
  value: string;
}

export enum EFilterType {
  INPUT,
  SELECT
}
