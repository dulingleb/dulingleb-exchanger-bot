import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

import { AdminsComponent } from './admins.component'
import { AdminsRoutingModule } from './admins-routing.module'

import { PageContentLayoutModule, PageTablePaginatorModule } from '@ui/index'

@NgModule({
  declarations: [AdminsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,

    AdminsRoutingModule,
    PageContentLayoutModule,
    PageTablePaginatorModule
  ],
  exports: [AdminsComponent]
})
export class AdminsModule {}
