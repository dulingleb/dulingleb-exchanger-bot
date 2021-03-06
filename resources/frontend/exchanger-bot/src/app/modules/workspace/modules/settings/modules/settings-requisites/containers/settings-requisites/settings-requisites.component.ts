import { Inject } from '@angular/core'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

import { ETableColumnActionEventType, IRequestApiDto, ISettingRequisiteDto, ITableActionEvent } from '@core/models'
import { IPaginator, IFilterField, EFilterType } from '@ui/table-filter-paginator'
import { ConfirmModalService, IConfirmModal } from '@ui/confirm-modal'
import { IUiFacade,UI_FACADE } from '@core/features'
import { SettingApiService } from '@core/api'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-settings-requisites',
  templateUrl: './settings-requisites.component.html'
})
export class SettingsRequisitesComponent implements OnInit, OnDestroy {

  requisites: ISettingRequisiteDto[] = []
  inRequest: boolean

  paginator: IPaginator
  filterFields: IFilterField[]

  tableColumns = TABLE_COLUMNS

  private destroy$ = new Subject()
  private requestApiQuery: IRequestApiDto

  constructor(
    private router: Router,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private confirmModalService: ConfirmModalService,
    private settingApiService: SettingApiService,
  ) {}

  ngOnInit(): void {
    this.initFilterFields()
  }

  getSettingRequisiteList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
    this.requestApiQuery = requestApiQuery
    this.inRequest = true
    this.settingApiService.getRequisiteList(requestApiQuery).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        this.requisites = res.data
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
    if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteRequisite(eventData.data) }
  }

  eventRequisite(requisite: ISettingRequisiteDto): void {
    this.router.navigate(['settings/requisites', requisite.id, 'edit'])
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected deleteRequisite(requisite: ISettingRequisiteDto): void {
    const data: IConfirmModal = {
      titleI18n: 'confirm.deleteModal.title',
      titleKeyI18n: requisite.id,
      messageI18n: 'confirm.deleteModal.message',
      messageKeyI18n: `${requisite.id} (${requisite.id})`,
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.settingApiService.deleteRequisite(requisite.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.requisites = this.requisites.filter(m => m.id !== requisite.id)
        this.getSettingRequisiteList()
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  protected initFilterFields(): void {
    this.filterFields = [
      {
        labelI18n: 'settings.requisites.table.title',
        name: 'title'
      },
      {
        labelI18n: 'settings.requisites.table.status',
        name: 'status',
        type: EFilterType.SELECT,
        options: [
          {
            value: 1,
            titleI18n: 'settings.requisites.status.1',
            class: 'text-accent'
          },
          {
            value: 0,
            titleI18n: 'settings.requisites.status.0',
            class: 'text-warn'
          }
        ]
      }
    ]
  }

}
