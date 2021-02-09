import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

import { LogoNamePipe, DecimalPipe, UserNamePipe, DayFormatPipe } from './pipes'

@NgModule({
  declarations: [
    DayFormatPipe,
    LogoNamePipe,
    UserNamePipe,
    DecimalPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    DayFormatPipe,
    LogoNamePipe,
    UserNamePipe,
    DecimalPipe,
  ],
})
export class SharedModule {}
