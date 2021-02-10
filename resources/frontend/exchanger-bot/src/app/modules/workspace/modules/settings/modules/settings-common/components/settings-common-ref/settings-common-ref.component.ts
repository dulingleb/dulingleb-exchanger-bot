import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { ISettingRefInDto } from '@core/models'

@Component({
  selector: 'app-settings-common-ref',
  templateUrl: './settings-common-ref.component.html',
})
export class SettingsCommonRefComponent implements OnChanges {

  @Input() inRequest: boolean
  @Input() errors: { [key: string]: string[] }
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors?.currentValue !== undefined) {
      this.showError()
    }
  }

  save(): void {
    const refUsersCount = this.form.get('refUsersCount').value
    const refPercent = this.form.get('refPercent').value
    this.changeValue.emit({ refUsersCount, refPercent })
  }

  private initFormFields(settings: ISettingRefInDto): void {
    this.form.patchValue({
      refUsersCount: settings?.refUsersCount,
      refPercent: settings?.refPercent
    })
  }

  private showError(): void {
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
  }

}
