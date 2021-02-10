import { SimpleChanges } from '@angular/core'
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-settings-common-mode',
  templateUrl: './settings-common-mode.component.html',
  styleUrls: ['./settings-common-mode.component.scss']
})
export class SettingsCommonModeComponent implements OnChanges {

  @Input() inRequest: boolean
  @Input() errors: { [key: string]: string[] }
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors?.currentValue !== undefined) {
      this.showError()
    }
  }

  save(): void {
    const isDemo = this.form.get('isDemo').value
    this.changeMode.emit(isDemo)
  }

  private initFormFields(isDemo: boolean): void {
    this.form.patchValue({ isDemo })
  }

  private showError(): void {
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
  }

}
