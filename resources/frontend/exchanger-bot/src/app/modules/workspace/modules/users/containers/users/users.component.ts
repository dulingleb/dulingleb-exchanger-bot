import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { EUserRoleDto, IUserFacade, USER_FACADE } from '@core/features'
import { IFilterField, IPaginator } from '@ui/index'
import { TelegramUserApiService } from '@core/api'
import { IRequestApiDto, ITelegramUserInDto } from '@core/models'

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
          page: res.currentPage - 1,
          pageSize: res.pageSize
        }
      },
      (err) => console.log('err', err),
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
        labelI18n: 'users.table.exchangerId',
        name: 'exchangerId'
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
