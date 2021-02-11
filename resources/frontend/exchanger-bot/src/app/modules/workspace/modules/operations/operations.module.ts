import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { PageContentLayoutModule } from '@ui/page-content-layout'
import { PageContentTableModule } from '@ui/page-content-table'
import { LoadingSpinnerModule } from '@ui/loading-spinner'
import { ConfirmModalModule } from '@ui/confirm-modal'
import { ImageModalModule } from '@ui/image-modal'
import { InputErrorModule } from '@ui/input-error'
import { SharedModule } from '@shared/index'

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
    RouterModule,
    OperationsRoutingModule,
    CarouselModule,

    SharedModule,
    ImageModalModule,
    InputErrorModule,
    ConfirmModalModule,
    LoadingSpinnerModule,
    PageContentTableModule,
    PageContentLayoutModule
  ],
  exports: [OperationsComponent]
})
export class OperationsModule {}
