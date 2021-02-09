import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { ISettingRefInDto } from '@core/models'

@Component({
  selector: 'app-settings-common-ref',
  templateUrl: './settings-common-ref.component.html',
})
export class SettingsCommonRefComponent {

  @Input() inRequest: boolean
  @Input() set refSettings(settings: ISettingRefInDto) {
    this.initFormFields(settings)
  }
  @Output() changeValue = new EventEmitter<ISettingRefInDto>()

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      refUsersCount: new FormControl(''),
      refPercent: new FormControl(''),
    })
  }

  save(): void {
    const refUsersCount = this.form.get('refUsersCount').value
    const refPercent = this.form.get('refPercent').value
    this.changeValue.emit({ refUsersCount, refPercent })
  }

  private initFormFields(settings: ISettingRefInDto): void {
    this.form.patchValue({
      refUsersCount: settings.refUsersCount,
      refPercent: settings.refPercent
    })
  }

}
