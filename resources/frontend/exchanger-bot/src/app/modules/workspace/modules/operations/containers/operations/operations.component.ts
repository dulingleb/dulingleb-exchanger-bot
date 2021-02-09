import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, takeUntil, withLatestFrom } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs'

import { IUiFacade, IAdminFacade, UI_FACADE, ADMIN_FACADE } from '@core/features'
import { IPaginator, IFilterField, EFilterType, IFilterValues } from '@ui/table-filter-paginator'
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

  userId: number
  paginator: IPaginator
  filterFields: IFilterField[]
  initFilterValues: IFilterValues[] = []

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()
  private requestApiQuery: IRequestApiDto

  constructor(
    private route: ActivatedRoute,
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private operationApiService: OperationApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params.user !== undefined) {
        this.userId = +params.user
        this.initFilterValues.push({
          name: 'telegramUserId',
          value: this.userId + ''
        })
      }
      this.initFilterFields()
    })
  }

  getOperationsList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
    this.requestApiQuery = requestApiQuery
    this.inRequest = true
    this.operationApiService.getList(requestApiQuery).pipe(
      withLatestFrom(this.adminFacade.admin$),
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
        // this.adminFacade.logout()
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
        labelI18n: 'operations.table.telegramUserId',
        name: 'telegramUserId',
        type: EFilterType.INPUT,
      },
      {
        labelI18n: 'operations.table.username',
        name: 'telegramUserName',
        type: EFilterType.INPUT,
      },
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
