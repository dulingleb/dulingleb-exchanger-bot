import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'

import { PageContentLayoutModule, PageContentTableModule } from '@ui/index'

import { OperationInfoComponent, OperationsComponent } from './containers'
import { OperationsRoutingModule } from './operations-routing.module'

@NgModule({
  declarations: [
    OperationsComponent,
    OperationInfoComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    OperationsRoutingModule,

    PageContentTableModule,
    PageContentLayoutModule
  ],
  exports: [OperationsComponent]
})
export class OperationsModule {}
