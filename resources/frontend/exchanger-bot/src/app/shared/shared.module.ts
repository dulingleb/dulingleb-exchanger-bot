import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { LogoNamePipe } from './pipes'

@NgModule({
  declarations: [
    LogoNamePipe,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LogoNamePipe,
  ],
})
export class SharedModule {}
