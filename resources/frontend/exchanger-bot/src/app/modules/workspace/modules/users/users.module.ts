import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

import { PageContentTableModule } from '@ui/index'

import { UsersComponent } from './containers'
import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,

    PageContentTableModule,
    UsersRoutingModule
  ],
  exports: [UsersComponent]
})
export class UsersModule {}
