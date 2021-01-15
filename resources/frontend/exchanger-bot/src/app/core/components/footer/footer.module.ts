import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'

import { FooterComponent } from './footer.component'

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
