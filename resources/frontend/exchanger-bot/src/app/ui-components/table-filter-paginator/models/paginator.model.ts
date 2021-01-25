export interface IPaginator {
  page: number;
  pageSize: number;
  length: number;
}

export interface IPaginatorEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
