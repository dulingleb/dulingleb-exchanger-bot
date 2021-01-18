import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LogoNamePipe } from './pipes'

@NgModule({
  declarations: [LogoNamePipe],
  imports: [CommonModule],
  exports: [LogoNamePipe],
})
export class SharedModule {}
