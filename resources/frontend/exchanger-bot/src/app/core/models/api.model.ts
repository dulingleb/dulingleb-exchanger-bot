import { IFilterValues } from '@ui/table-filter-paginator'

export interface IRequestApiDto {
  page: number;
	pageSize: number;
  sort: string;
  order: 'asc' | 'desc' | '';
  filterValues: IFilterValues[];
}

export interface ICommonResponseDto<T> {
  status: boolean;
  statusCode?: number;
  message: string;
  errors?: { [key: string]: string[] };
  data?: T;
}

export interface IResponseApiDto<T> {
  totalPages: number;
	content: T;
  page: number;
	pageSize: number;
	query: string;
}

export interface IResponseApiOutDto<T> {
  current_page: number;
  from: number; // page
  last_page: number;
  per_page: number; // pageSize
  to: number;
  total: number;
  data: T;
}

export interface IResponseApiInDto<T> {
  currentPage: number;
  page: number;
	lastPage: number;
	pageSize: number;
	to: number;
  total: number;
  sort?: string;
  data: T;
}
