import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { ICommonLimitSetting } from '../../constants'

@Component({
  selector: 'app-settings-common-limits',
  templateUrl: './settings-common-limits.component.html',
  styleUrls: ['./settings-common-limits.component.scss']
})
export class SettingsCommonLimitsComponent {

  @Input() inRequest: boolean
  @Input() set limitSettings(settings: ICommonLimitSetting) {
    this.initFormFields(settings)
  }
  @Output() changeValue = new EventEmitter<ICommonLimitSetting>()

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      course: new FormControl('', [Validators.min(0)]),
      minExchange: new FormControl('', [Validators.min(0)]),
      maxExchange: new FormControl('', [Validators.min(0)]),
    })
  }

  save(): void {
    const course = this.form.get('course').value
    const minExchange = this.form.get('minExchange').value
    const maxExchange = this.form.get('maxExchange').value
    this.changeValue.emit({ course, minExchange, maxExchange })
  }


  private initFormFields(settings: ICommonLimitSetting): void {
    this.form.patchValue({
      course: settings.course,
      minExchange: settings.minExchange,
      maxExchange: settings.maxExchange
    })
  }

}