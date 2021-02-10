import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { ISettingKeysInDto } from '@core/models'

@Component({
  selector: 'app-settings-common-keys',
  templateUrl: './settings-common-keys.component.html',
})
export class SettingsCommonKeysComponent implements OnChanges {

  @Input() inRequest: boolean
  @Input() errors: { [key: string]: string[] }
  @Input() set keysSetting(settings: ISettingKeysInDto) {
    this.initFormFields(settings)
  }
  @Output() changeValue = new EventEmitter<ISettingKeysInDto>()

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      coinbaseKey: new FormControl(''),
      coinbaseSecret: new FormControl(''),
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors?.currentValue !== undefined) {
      this.showError()
    }
  }

  saveKeys(): void {
    const coinbaseKey = this.form.get('coinbaseKey').value
    const coinbaseSecret = this.form.get('coinbaseSecret').value
    this.changeValue.emit({ coinbaseKey, coinbaseSecret })
  }

  private initFormFields(settings: ISettingKeysInDto): void {
    this.form.patchValue({
      coinbaseKey: settings?.coinbaseKey,
      coinbaseSecret: settings?.coinbaseSecret,
    })
  }

  private showError(): void {
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
  }

}
