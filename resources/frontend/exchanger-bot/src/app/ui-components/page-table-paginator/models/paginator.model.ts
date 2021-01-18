export interface IPaginator {
  pageNumber: number;
  pageSize: number;
}

export interface IPaginatorEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
