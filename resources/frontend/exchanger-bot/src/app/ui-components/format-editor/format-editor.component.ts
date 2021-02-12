import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-format-editor',
  templateUrl: './format-editor.component.html',
  styleUrls: ['./format-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormatEditorComponent),
      multi: true
    }
  ]
})
export class FormatEditorComponent implements ControlValueAccessor {

  @Input() label: string
  @Input() set height(h: number) {
    this.initSettings = this.getEditorSettings(h)
  }

  initSettings = this.getEditorSettings()
  text: string
  innerValue: string

  private onChangeCallback: any

  writeValue(value: any): void {
    if (value !== this.text) {
        this.text = value
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn
  }

  registerOnTouched(): void {}

  onChange(): void {
    const newValue = this.text
    this.onChangeCallback(newValue)
  }

  private getEditorSettings(height = 400): any {
    return {
      height: height || 400,
      menubar: false,
      force_br_newlines : true,
      force_p_newlines : false,
      forced_root_block : '',

      formats : {
        underline : { inline : 'u', exact : true },
        strikethrough : { inline : 'del', exact : true }
      },

      style_formats: [
        { title: 'Pre', format: 'pre' }
      ],

      valid_children: 'body[span,strong,em,u,del]',

      plugins: [ 'code help wordcount emoticons' ],

      toolbar: 'undo redo | styleselect | bold italic underline strikethrough | emoticons | removeformat | code',

      init_instance_callback: (): void => {
        this.clearToxNotes()
        setTimeout(() => this.clearToxNotes(), 1)
        setTimeout(() => this.clearToxNotes(), 100)
        setTimeout(() => this.clearToxNotes(), 1000)
      },
    }
  }

  private clearToxNotes(): void {
    const freeTiny = document.querySelector('.tox .tox-notification--in') as HTMLElement
    if (freeTiny) { freeTiny.style.display = 'none' }
  }

}
