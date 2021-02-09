import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { ISettingInDto, ISettingKeysInDto, ISettingLimitInDto, ISettingRefInDto, ISettingTelegramInDto } from '@core/models'
import { IUiFacade, IAdminFacade, UI_FACADE, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-settings-common',
  templateUrl: './settings-common.component.html',
  styleUrls: ['./settings-common.component.scss']
})
export class SettingsCommonComponent implements OnInit, OnDestroy {

  inRequest: boolean

  limitSettings: ISettingLimitInDto
  telegramSettings: ISettingTelegramInDto
  keysSetting: ISettingKeysInDto
  refSettings: ISettingRefInDto
  isDemo: boolean

  private destroy$ = new Subject()

  constructor(
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private settingApiService: SettingApiService,
  ) {}

  ngOnInit(): void {
    this.inRequest = true
    this.settingApiService.getSettings().pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveLimits(limitSettings: ISettingLimitInDto): void {
    this.inRequest = true
    this.settingApiService.saveLimits(limitSettings).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveMode(isDemo: boolean): void {
    this.inRequest = true
    this.settingApiService.saveMode(isDemo).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveTelegram(telegramSettings: ISettingTelegramInDto): void {
    this.inRequest = true
    this.settingApiService.saveTelegram(telegramSettings).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveRef(refSettings: ISettingRefInDto): void {
    this.inRequest = true
    this.settingApiService.saveRef(refSettings).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveKeys(keysSetting: ISettingKeysInDto): void {
    this.inRequest = true
    this.settingApiService.saveKeys(keysSetting).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private initFormFields(settings: ISettingInDto): void {
    this.isDemo = settings.demo
    this.limitSettings = {
      course: settings.course,
      minExchange: settings.minExchange,
      maxExchange: settings.maxExchange
    }
    this.refSettings = {
      refPercent: settings.refPercent,
      refUsersCount: settings.refUsersCount
    }
    this.telegramSettings = {
      telegramToken: settings.telegramToken,
      username: settings.username,
    }
    this.keysSetting = {
      coinbaseKey: settings.coinbaseKey,
      coinbaseSecret: settings.coinbaseSecret,
    }
  }

}
