import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorModule } from '@tinymce/tinymce-angular'
import { FormsModule } from '@angular/forms'

import { FormatEditorComponent } from './format-editor.component'

@NgModule({
  declarations: [FormatEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditorModule,
  ],
  exports: [FormatEditorComponent],
})
export class FormatEditorModule {}
