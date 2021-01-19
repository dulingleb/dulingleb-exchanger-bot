import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'

import { PageContentLayoutModule, PageTablePaginatorModule } from '@ui/index'

import { AdminsTableComponent } from './components/student-table/admins-table.component'
import { AdminEditComponent, AdminInfoComponent, AdminsComponent } from './containers'
import { AdminsRoutingModule } from './admins-routing.module'

@NgModule({
  declarations: [
    AdminsComponent,
    AdminsTableComponent,
    AdminInfoComponent,
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    TranslateModule,

    AdminsRoutingModule,
    PageContentLayoutModule,
    PageTablePaginatorModule
  ],
  exports: [AdminsComponent]
})
export class AdminsModule {}
