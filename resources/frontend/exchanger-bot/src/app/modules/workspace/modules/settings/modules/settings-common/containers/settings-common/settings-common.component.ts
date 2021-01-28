import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { ISettingInDto } from '@core/models'
import { SettingApiService } from '@core/api'
import { IUiFacade, IUserFacade, UI_FACADE, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-settings-common',
  templateUrl: './settings-common.component.html'
})
export class SettingsCommonComponent implements OnInit, OnDestroy {

  formLimits: FormGroup
  formTelegram: FormGroup
  formKeys: FormGroup
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private settingApiService: SettingApiService,
  ) {
    this.formLimits = new FormGroup({
      course: new FormControl('', [Validators.min(0)]),
      minExchange: new FormControl('', [Validators.min(0)]),
      maxExchange: new FormControl('', [Validators.min(0)]),
    })
    this.formTelegram = new FormGroup({
      telegramToken: new FormControl(''),
      username: new FormControl(''),
    })
    this.formKeys = new FormGroup({
      coinbaseKey: new FormControl(''),
      coinbaseSecret: new FormControl(''),
    })
  }

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

  saveLimits(): void {
    const course = this.formLimits.get('course').value
    const minExchange = this.formLimits.get('minExchange').value
    const maxExchange = this.formLimits.get('maxExchange').value

    this.inRequest = true
    this.settingApiService.saveLimits({ course, minExchange, maxExchange }).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveTelegram(): void {
    const telegramToken = this.formTelegram.get('telegramToken').value
    const username = this.formTelegram.get('username').value

    this.inRequest = true
    this.settingApiService.saveTelegram({ telegramToken, username }).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (settings) => this.initFormFields(settings),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  saveKeys(): void {
    const coinbaseKey = this.formKeys.get('coinbaseKey').value
    const coinbaseSecret = this.formKeys.get('coinbaseSecret').value

    this.inRequest = true
    this.settingApiService.saveKeys({ coinbaseKey, coinbaseSecret }).pipe(
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
    this.formLimits.patchValue({
      course: settings.course,
      minExchange: settings.minExchange,
      maxExchange: settings.maxExchange
    })
    this.formTelegram.patchValue({
      telegramToken: settings.telegramToken,
      username: settings.username,
    })
    this.formKeys.patchValue({
      coinbaseKey: settings.coinbaseKey,
      coinbaseSecret: settings.coinbaseSecret,
    })
  }

}
