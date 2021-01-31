import { Inject } from '@angular/core'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { filter, finalize, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { ETableColumnActionEventType, IRequestApiDto, ISettingCommissionDto, ITableActionEvent } from '@core/models'
import { IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'
import { ConfirmModalService, IConfirmModal } from '@ui/confirm-modal'
import { IPaginator, IFilterField } from '@ui/table-filter-paginator'
import { SettingApiService } from '@core/api'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-settings-commissions',
  templateUrl: './settings-commissions.component.html'
})
export class SettingsCommissionComponent implements OnInit, OnDestroy {

  commissions: ISettingCommissionDto[] = []
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
    private settingApiService: SettingApiService,
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
  }

  getSettingCommissionList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
    this.requestApiQuery = requestApiQuery
    this.inRequest = true
    this.settingApiService.getCommissionList(requestApiQuery).pipe(
      withLatestFrom(this.userFacade.user$),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      ([res, user]) => { // TODO: User role
        this.commissions = res.data
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
    if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteCommission(eventData.data) }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected deleteCommission(commission: ISettingCommissionDto): void {
    const data: IConfirmModal = {
      titleI18n: 'confirm.deleteModal.title',
      titleKeyI18n: '',
      messageI18n: 'confirm.deleteModal.message',
      messageKeyI18n: `${commission.from} - ${commission.to} : ${commission.percent} %`,
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.settingApiService.deleteCommission(commission.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.commissions = this.commissions.filter(m => m.id !== commission.id)
        this.getSettingCommissionList()
      },
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  protected initFilterFields(): void {
    this.filterFields = []
  }

}
