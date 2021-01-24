import { Component, EventEmitter, Inject, Input, OnDestroy, AfterViewInit, Output } from '@angular/core'
import { debounceTime, takeUntil } from 'rxjs/operators'
import { BehaviorSubject, Subject } from 'rxjs'

import { IUserFacade, USER_FACADE } from '@core/features'
import { IFilterField, IFilterValues, IPaginator } from '@ui/index'
import { IRequestApiDto, ISortEvent, ITableActionEvent, ITableColumn } from '@core/models'

@Component({
  selector: 'app-page-content-table',
  templateUrl: './page-content-table.component.html',
})
export class PageContentTableComponent implements AfterViewInit, OnDestroy {

  @Output() getList = new EventEmitter<IRequestApiDto>()
  @Output() eventData = new EventEmitter<ITableActionEvent>()

  @Input() items: []
  @Input() inRequest: boolean
  @Input() paginator: IPaginator
  @Input() tableColumns: ITableColumn[]
  @Input() filterFields: IFilterField[]

  private requestApiQuery$ = new BehaviorSubject<IRequestApiDto>({
    page: 0,
    sort: '',
    pageSize: 10,
    filterValues: []
  })
  private destroy$ = new Subject()

  constructor(@Inject(USER_FACADE) public userFacade: IUserFacade) {}

  ngAfterViewInit(): void {
    this.requestApiQuery$.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(req => this.getList.emit(req))
  }

  changePaginator(paginator: IPaginator): void {
    this.requestApiQuery$.next({
      ...this.requestApiQuery$.value,
      page: paginator.page,
      pageSize: paginator.pageSize,
    })
  }

  sortData(sortEvent: ISortEvent): void {
    let sort = sortEvent.direction === 'desc' ? '-' : ''
    sort += sortEvent.direction === '' ? '' : sortEvent.active
    this.requestApiQuery$.next({
      ...this.requestApiQuery$.value,
      sort
    })
  }

  filter(filterValues: IFilterValues[]): void {
    if (!this.requestApiQuery$.value.filterValues.length && !filterValues.length) { return }
    this.requestApiQuery$.next({
      ...this.requestApiQuery$.value,
      filterValues
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
