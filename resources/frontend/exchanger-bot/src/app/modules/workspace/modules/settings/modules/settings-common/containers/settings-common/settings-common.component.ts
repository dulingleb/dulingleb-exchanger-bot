import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { ISettingInDto } from '@core/models'
import { SettingApiService } from '@core/api'
import { IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'

import { ICommonKeysSetting, ICommonLimitSetting, ICommonTelegramSetting } from '../../constants'

@Component({
  selector: 'app-settings-common',
  templateUrl: './settings-common.component.html',
  styleUrls: ['./settings-common.component.scss']
})
export class SettingsCommonComponent implements OnInit, OnDestroy {

  inRequest: boolean

  limitSettings: ICommonLimitSetting
  telegramSettings: ICommonTelegramSetting
  keysSetting: ICommonKeysSetting

  private destroy$ = new Subject()

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
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

  saveLimits(limitSettings: ICommonLimitSetting): void {
    this.inRequest = true
    this.settingApiService.saveLimits(limitSettings).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveTelegram(telegramSettings: ICommonTelegramSetting): void {
    this.inRequest = true
    this.settingApiService.saveTelegram(telegramSettings).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveKeys(keysSetting: ICommonKeysSetting): void {
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
    this.limitSettings = {
      course: settings.course,
      minExchange: settings.minExchange,
      maxExchange: settings.maxExchange
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
