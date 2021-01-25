import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { PageContentLayoutComponent, PageContentComponent } from './containers'

@NgModule({
  declarations: [
    PageContentLayoutComponent,
    PageContentComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    PageContentLayoutComponent,
    PageContentComponent
  ]
})
export class PageContentLayoutModule {}
