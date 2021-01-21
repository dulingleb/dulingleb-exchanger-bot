import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'

import { TableFilterPaginatorModule } from '../table-filter-paginator'
import { PageContentLayoutModule } from '../page-content-layout'
import { LoadingSpinnerModule } from '../loading-spinner'

import { PageContentTableComponent } from './containers'
import { ContentTableComponent } from './components'

@NgModule({
  declarations: [
    PageContentTableComponent,
    ContentTableComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    RouterModule,
    TranslateModule,

    LoadingSpinnerModule,
    PageContentLayoutModule,
    TableFilterPaginatorModule,
  ],
  exports: [PageContentTableComponent]
})
export class PageContentTableModule {}
