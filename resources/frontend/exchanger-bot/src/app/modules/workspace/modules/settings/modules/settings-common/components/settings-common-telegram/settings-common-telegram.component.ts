import { Component, EventEmitter, Inject, Input, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { SettingApiService } from '@core/api'
import { IUiFacade, IAdminFacade, UI_FACADE, ADMIN_FACADE } from '@core/features'

import { ICommonTelegramSetting } from '../../constants'

@Component({
  selector: 'app-settings-common-telegram',
  templateUrl: './settings-common-telegram.component.html'
})
export class SettingsCommonTelegramComponent {

  @Input() inRequest: boolean
  @Input() set telegramSettings(settings: ICommonTelegramSetting) {
    this.initFormFields(settings)
  }
  @Output() changeValue = new EventEmitter<ICommonTelegramSetting>()

  form: FormGroup

  constructor(
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private settingApiService: SettingApiService,
  ) {
    this.form = new FormGroup({
      telegramToken: new FormControl(''),
      username: new FormControl(''),
    })
  }

  saveTelegram(): void {
    const telegramToken = this.form.get('telegramToken').value
    const username = this.form.get('username').value
    this.changeValue.emit({ telegramToken, username })
  }


  private initFormFields(settings: ICommonTelegramSetting): void {
    this.form.patchValue({
      telegramToken: settings.telegramToken,
      username: settings.username,
    })
  }

}
