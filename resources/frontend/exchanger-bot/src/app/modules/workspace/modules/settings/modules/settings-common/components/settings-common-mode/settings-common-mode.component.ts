import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-settings-common-mode',
  templateUrl: './settings-common-mode.component.html',
  styleUrls: ['./settings-common-mode.component.scss']
})
export class SettingsCommonModeComponent {

  @Input() inRequest: boolean
  @Input() set isDemo(isDemo: boolean) {
    this.initFormFields(isDemo)
  }
  @Output() changeMode = new EventEmitter<boolean>()

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      isDemo: new FormControl(false),
    })
  }

  save(): void {
    const isDemo = this.form.get('isDemo').value
    this.changeMode.emit(isDemo)
  }

  private initFormFields(isDemo: boolean): void {
    this.form.patchValue({ isDemo })
  }

}
