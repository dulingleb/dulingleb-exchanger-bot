import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { PageContentLayoutComponent, PageLayoutTableComponent, PageContentComponent } from './containers'

@NgModule({
  declarations: [
    PageContentLayoutComponent,
    PageLayoutTableComponent,
    PageContentComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    PageContentLayoutComponent,
    PageLayoutTableComponent,
    PageContentComponent
  ]
})
export class PageContentLayoutModule {}
