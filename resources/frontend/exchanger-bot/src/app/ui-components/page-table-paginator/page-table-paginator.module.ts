import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatPaginatorModule } from '@angular/material/paginator'

import { PageTablePaginatorComponent } from './components/list-paginator/page-table-paginator.component'

@NgModule({
  declarations: [PageTablePaginatorComponent],
  imports: [CommonModule, MatPaginatorModule],
  exports: [PageTablePaginatorComponent],
})
export class PageTablePaginatorModule {}
