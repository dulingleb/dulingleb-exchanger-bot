import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { IUiFacade, IAdminFacade, UI_FACADE, ADMIN_FACADE } from '@core/features'
import { IPaginator, IFilterField, EFilterType } from '@ui/table-filter-paginator'
import { IRequestApiDto, ITelegramUserInDto } from '@core/models'
import { TelegramUserApiService } from '@core/api'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {

  users: ITelegramUserInDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()

  constructor(
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private adminApiService: TelegramUserApiService
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
  }

  getAdminList(requestApiQuery: IRequestApiDto): void {
    this.inRequest = true
    this.adminApiService.getList(requestApiQuery).pipe(
      withLatestFrom(this.adminFacade.admin$),
      finalize(() => this.inRequest = false),
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
        name: 'username',
        type: EFilterType.INPUT
      },
      {
        labelI18n: 'users.table.ban',
        name: 'ban',
        type: EFilterType.SELECT,
        options: [
          {
            value: false,
            titleI18n: 'user.ban.0',
            class: 'text-success'
          },
          {
            value: true,
            titleI18n: 'user.ban.1',
            class: 'text-warn'
          }
        ]
      }
    ]
  }

}
