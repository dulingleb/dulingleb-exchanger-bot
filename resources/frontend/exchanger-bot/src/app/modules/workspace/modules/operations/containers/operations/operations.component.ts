import { Component, Inject, OnDestroy, OnInit } from '@angular/core'

import { OperationApiService } from '@core/api'
import { EUserRoleDto, IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'
import { IOperationInDto, IRequestApiDto } from '@core/models'
import { IFilterField, IPaginator } from '@ui/index'
import { Subject } from 'rxjs'
import { finalize, takeUntil, withLatestFrom } from 'rxjs/operators'
import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
})
export class OperationsComponent implements OnInit, OnDestroy {

  currentUserRole: EUserRoleDto = EUserRoleDto.ADMIN
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
        labelI18n: 'operations.table.id',
        name: 'id'
      },
      {
        labelI18n: 'operations.table.username',
        name: 'username'
      },
      {
        labelI18n: 'operations.table.amount',
        name: 'amount'
      },
      {
        labelI18n: 'operations.table.price',
        name: 'price'
      }
    ]
  }

}
