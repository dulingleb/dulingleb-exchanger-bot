import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { IAdminFacade, ADMIN_FACADE } from '@core/features'
import { ISettingTelegramInDto } from '@core/models'

@Component({
  selector: 'app-settings-common-telegram',
  templateUrl: './settings-common-telegram.component.html'
})
export class SettingsCommonTelegramComponent implements OnChanges {

  @Input() inRequest: boolean
  @Input() errors: { [key: string]: string[] }
  @Input() set telegramSettings(settings: ISettingTelegramInDto) {
    this.initFormFields(settings)
  }
  @Output() changeValue = new EventEmitter<ISettingTelegramInDto>()

  form: FormGroup

  constructor(@Inject(ADMIN_FACADE) public adminFacade: IAdminFacade) {
    this.form = new FormGroup({
      telegramToken: new FormControl(''),
      username: new FormControl(''),
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors?.currentValue !== undefined) {
      this.showError()
    }
  }

  saveTelegram(): void {
    const telegramToken = this.form.get('telegramToken').value
    const username = this.form.get('username').value
    this.changeValue.emit({ telegramToken, username })
  }

  private initFormFields(settings: ISettingTelegramInDto): void {
    this.form.patchValue({
      telegramToken: settings?.telegramToken,
      username: settings?.username,
    })
  }

  private showError(): void {
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
  }

}
