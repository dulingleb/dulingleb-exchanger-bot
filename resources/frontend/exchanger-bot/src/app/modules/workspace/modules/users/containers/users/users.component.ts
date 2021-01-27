import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { EUserRoleDto, IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'
import { IPaginator, IFilterField } from '@ui/table-filter-paginator'
import { IRequestApiDto, ITelegramUserInDto } from '@core/models'
import { TelegramUserApiService } from '@core/api'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {

  currentUserRole: EUserRoleDto = EUserRoleDto.ADMIN
  users: ITelegramUserInDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private adminApiService: TelegramUserApiService
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
  }

  getAdminList(requestApiQuery: IRequestApiDto): void {
    this.inRequest = true
    this.adminApiService.getList(requestApiQuery).pipe(
      withLatestFrom(this.userFacade.user$),
      takeUntil(this.destroy$)
    ).subscribe(
      ([res, user]) => {
        this.users = res.data
        this.paginator = {
          length: res.total,
          page: res.currentPage,
          pageSize: res.pageSize
        }
      },
      (err) => this.uiFacade.addErrorNotification(err.message),
      () => this.inRequest = false
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected initFilterFields(): void {
    this.filterFields = [
      {
        labelI18n: 'users.table.username',
        name: 'username'
      },
      {
        labelI18n: 'users.table.telegramUserId',
        name: 'telegramUserId'
      },
      {
        labelI18n: 'users.table.operationsCount',
        name: 'operationsCount'
      }
    ]
  }

}
