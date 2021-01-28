import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'

import { TableFilterPaginatorComponent } from './containers'
import { TableFilterComponent, TablePaginatorComponent } from './components'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    TableFilterPaginatorComponent,
    TablePaginatorComponent,
    TableFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    TranslateModule
  ],
  exports: [TableFilterPaginatorComponent],
})
export class TableFilterPaginatorModule {}
