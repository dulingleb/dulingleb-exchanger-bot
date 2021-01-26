import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { filter, finalize, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { EUserRoleDto, IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'
import { ETableColumnActionEventType, IRequestApiDto, ISettingMessageDto, ITableActionEvent } from '@core/models'
import { ConfirmModalService, IConfirmModal, IFilterField, IPaginator } from '@ui/index'
import { SettingApiService } from '@core/api'

import { TABLE_COLUMNS } from '../../constants/table-columns'

@Component({
  selector: 'app-setting-messages',
  templateUrl: './setting-messages.component.html',
})
export class SettingMessagesComponent implements OnInit, OnDestroy {

  currentUserRole: EUserRoleDto = EUserRoleDto.ADMIN // TODO: User role
  messages: ISettingMessageDto[] = []
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

  getSettingMessageList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
    this.requestApiQuery = requestApiQuery
    this.inRequest = true
    this.settingApiService.getMessageList(requestApiQuery).pipe(
      withLatestFrom(this.userFacade.user$),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      ([res, user]) => { // TODO: User role
        this.messages = res.data
        this.paginator = {
          length: res.total,
          page: res.currentPage,
          pageSize: res.pageSize
        }
      },
      (err) => {
        this.userFacade.logout()
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  setEventData(eventData: ITableActionEvent): void {
    if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteMessage(eventData.data) }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected deleteMessage(message: ISettingMessageDto): void {
    const data: IConfirmModal = {
      titleI18n: 'confirm.deleteModal.title',
      titleKeyI18n: message.slug,
      messageI18n: 'confirm.deleteModal.message',
      messageKeyI18n: `${message.slug} (${message.title})`,
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.settingApiService.deleteMessageTemplate(message.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.messages = this.messages.filter(m => m.id !== message.id)
        this.getSettingMessageList()
      },
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  protected initFilterFields(): void {
    this.filterFields = [
      {
        labelI18n: 'settings.messages.table.title',
        name: 'title'
      },
      {
        labelI18n: 'settings.messages.table.slug',
        name: 'slug'
      }
    ]
  }

}
