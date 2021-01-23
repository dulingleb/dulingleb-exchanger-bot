import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { catchError, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { EUserRoleDto, IUserFacade, IUserInDto, USER_FACADE } from '@core/features'
import { IFilterField, IPaginator, ConfirmModalService, IConfirmModal } from '@ui/index'
import { IRequestApiDto } from '@core/models'
import { AdminApiService } from '@core/api'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent implements OnInit, OnDestroy {

  currentUserRole: EUserRoleDto = EUserRoleDto.ADMIN
  users: IUserInDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    private adminApiService: AdminApiService,
    private confirmModalService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
    const data: IConfirmModal = {
      titleI18n: 'confirm.delete-modal.title',
      titleKeyI18n: 'пользователя',
      messageI18n: 'confirm.delete-modal.message',
      messageKeyI18n: 'bla',
      confirmBtn: true,
      cancelBtn: true
    }
    // this.confirmModalService.openDialog(data)
  }

  getAdminList(requestApiQuery: IRequestApiDto): void {
    this.inRequest = true
    this.adminApiService.getList(requestApiQuery).pipe(
      withLatestFrom(this.userFacade.user$),
      takeUntil(this.destroy$)
    ).subscribe(
      ([res, user]) => {
        console.log('aa', res, user)
        this.users = res.data
        this.paginator = {
          length: res.total,
          page: res.currentPage - 1,
          pageSize: res.pageSize
        }
      },
      (err) => {
        this.userFacade.logout()
        console.log('err', err)
      },
      () => {
        this.inRequest = false
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
        labelI18n: 'admins.table.name',
        name: 'name'
      },
      {
        labelI18n: 'admins.table.email',
        name: 'email'
      }
    ]
  }

}
