import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LogoNamePipe, DecimalPipe, UserNamePipe } from './pipes'

@NgModule({
  declarations: [
    LogoNamePipe,
    UserNamePipe,
    DecimalPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LogoNamePipe,
    UserNamePipe,
    DecimalPipe,
  ],
})
export class SharedModule {}
