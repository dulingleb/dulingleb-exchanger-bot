import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'

import { InputErrorComponent } from './input-error.component'

@NgModule({
  declarations: [InputErrorComponent],
  imports: [
    CommonModule,
    MatInputModule
  ],
  providers: [InputErrorComponent],
  exports: [InputErrorComponent]
})
export class InputErrorModule {}
