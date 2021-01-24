import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { catchError, filter, finalize, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { EUserRoleDto, IUserFacade, IUserInDto, USER_FACADE } from '@core/features'
import { IFilterField, IPaginator, ConfirmModalService, IConfirmModal } from '@ui/index'
import { ETableColumnActionEventType, IRequestApiDto, ITableActionEvent } from '@core/models'

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
  private requestApiQuery: IRequestApiDto

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    private confirmModalService: ConfirmModalService,
    private adminApiService: AdminApiService,
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
  }

  getAdminList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
    this.requestApiQuery = requestApiQuery
    this.inRequest = true
    this.adminApiService.getList(requestApiQuery).pipe(
      withLatestFrom(this.userFacade.user$),
      finalize(() => this.inRequest = false),
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
      }
    )
  }

  setEventData(eventData: ITableActionEvent): void {
    if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteUser(eventData.data) }
  }

  deleteUser(user: IUserInDto): void {
    const data: IConfirmModal = {
      titleI18n: 'confirm.delete-modal.title',
      titleKeyI18n: user.name,
      messageI18n: 'confirm.delete-modal.message',
      messageKeyI18n: `${user.name} (${user.email})`,
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.adminApiService.deleteUser(user.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== user.id)
        this.getAdminList()
      },
      (err) => {
        console.log('err', err)
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
