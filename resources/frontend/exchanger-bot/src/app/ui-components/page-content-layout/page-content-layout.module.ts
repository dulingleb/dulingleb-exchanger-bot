import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

import { PageContentLayoutComponent } from './containers/page-content-layout/page-content-layout.component'
import { PageLayoutTableComponent } from './containers/page-layout-table/page-layout-table.component'

@NgModule({
  declarations: [
    PageContentLayoutComponent,
    PageLayoutTableComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    PageContentLayoutComponent,
    PageLayoutTableComponent
  ]
})
export class PageContentLayoutModule {}
