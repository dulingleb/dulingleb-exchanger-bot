import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { FooterComponent } from './footer.component'

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
