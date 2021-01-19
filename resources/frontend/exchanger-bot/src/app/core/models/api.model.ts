export interface IRequestApiDto {
  page: number;
	pageSize: number;
	query: string;
}

export interface IResponseApiDto<T> {
  totalPages: number;
	content: T;
  page: number;
	pageSize: number;
	query: string;
}
