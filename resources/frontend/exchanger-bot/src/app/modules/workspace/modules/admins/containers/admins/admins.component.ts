import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { ETableColumnActionEventType, IRequestApiDto, ITableActionEvent } from '@core/models'
import { IUiFacade, IUserFacade, IUserInDto, UI_FACADE, USER_FACADE } from '@core/features'
import { ConfirmModalService, IConfirmModal } from '@ui/confirm-modal'
import { IPaginator, IFilterField } from '@ui/table-filter-paginator'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent implements OnInit, OnDestroy {

  users: IUserInDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()
  private requestApiQuery: IRequestApiDto

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
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
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        this.users = res.data
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

  setEventData(eventData: ITableActionEvent): void {
    if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteUser(eventData.data) }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected deleteUser(user: IUserInDto): void {
    const data: IConfirmModal = {
      titleI18n: 'confirm.deleteModal.title',
      titleKeyI18n: user.name,
      messageI18n: 'confirm.deleteModal.message',
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
        this.uiFacade.addErrorNotification(err.message)
      }
    )
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
