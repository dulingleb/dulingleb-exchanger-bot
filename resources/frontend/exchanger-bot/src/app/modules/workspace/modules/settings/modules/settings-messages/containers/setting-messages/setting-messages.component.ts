import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { SettingApiService } from '@core/api'
import { EUserRoleDto, IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'
import { ETableColumnActionEventType, IRequestApiDto, ISettingMessageDto, ITableActionEvent } from '@core/models'
import { ConfirmModalService, IFilterField, IPaginator } from '@ui/index'
import { Subject } from 'rxjs'
import { finalize, takeUntil, withLatestFrom } from 'rxjs/operators'
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

  getAdminList(requestApiQuery: IRequestApiDto = this.requestApiQuery): void {
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
    // if (eventData.event === ETableColumnActionEventType.DELETE) { this.deleteUser(eventData.data) }
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected initFilterFields(): void {
    this.filterFields = [
      {
        labelI18n: 'settings.messages.table.title',
        name: 'title'
      }
    ]
  }

}
