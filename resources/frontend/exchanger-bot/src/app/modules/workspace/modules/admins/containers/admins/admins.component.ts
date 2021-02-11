import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { ETableColumnActionEventType, IRequestApiDto, ITableActionEvent } from '@core/models'
import { IUiFacade, IAdminFacade, IAdminInDto, UI_FACADE, ADMIN_FACADE } from '@core/features'
import { ConfirmModalService, IConfirmModal } from '@ui/confirm-modal'
import { IPaginator, IFilterField } from '@ui/table-filter-paginator'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent implements OnInit, OnDestroy {

  users: IAdminInDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()
  private requestApiQuery: IRequestApiDto

  constructor(
    private router: Router,
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
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
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  setEventData(eventData: ITableActionEvent): void {
    if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteUser(eventData.data) }
  }

  eventAdmin(admin: IAdminInDto): void {
    this.router.navigate(['admins', admin.id, 'edit'])
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected deleteUser(user: IAdminInDto): void {
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
      mergeMap(() => this.adminApiService.deleteAdmin(user.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== user.id)
        this.getAdminList()
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
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
