import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'
import { IPaginator, IFilterField, EFilterType } from '@ui/table-filter-paginator'
import { IOperationInDto, IRequestApiDto } from '@core/models'
import { OperationApiService } from '@core/api'

import { EOperationStatus, OPERATION_CLASS, TABLE_COLUMNS } from '../../constants'

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
})
export class OperationsComponent implements OnInit, OnDestroy {

  operations: IOperationInDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()
  private requestApiQuery: IRequestApiDto

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private operationApiService: OperationApiService
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
  }

  getOperationsList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
    this.requestApiQuery = requestApiQuery
    this.inRequest = true
    this.operationApiService.getList(requestApiQuery).pipe(
      withLatestFrom(this.userFacade.user$),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      ([res, user]) => {
        this.operations = res.data
        this.paginator = {
          length: res.total,
          page: res.currentPage,
          pageSize: res.pageSize
        }
      },
      (err) => {
        // this.userFacade.logout()
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected initFilterFields(): void {
    this.filterFields = [
      {
        labelI18n: 'operations.table.status',
        name: 'status',
        type: EFilterType.SELECT,
        options: [
          {
            value: EOperationStatus.IN_PAY,
            titleI18n: 'operation.status.' + EOperationStatus.IN_PAY,
            class: OPERATION_CLASS[EOperationStatus.IN_PAY]
          },
          {
            value: EOperationStatus.SUCCESS,
            titleI18n: 'operation.status.' + EOperationStatus.SUCCESS,
            class: OPERATION_CLASS[EOperationStatus.SUCCESS]
          },
          {
            value: EOperationStatus.ERROR,
            titleI18n: 'operation.status.' + EOperationStatus.ERROR,
            class: OPERATION_CLASS[EOperationStatus.ERROR]
          },
          {
            value: EOperationStatus.IN_SEND_CHECK,
            titleI18n: 'operation.status.' + EOperationStatus.IN_SEND_CHECK,
            class: OPERATION_CLASS[EOperationStatus.IN_SEND_CHECK]
          },
          {
            value: EOperationStatus.ON_CHECK,
            titleI18n: 'operation.status.' + EOperationStatus.ON_CHECK,
            class: OPERATION_CLASS[EOperationStatus.ON_CHECK]
          },
          {
            value: EOperationStatus.CANCEL,
            titleI18n: 'operation.status.' + EOperationStatus.CANCEL,
            class: OPERATION_CLASS[EOperationStatus.CANCEL]
          },
        ]
      }
    ]
  }

}
