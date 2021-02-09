import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ChartsModule } from 'ng2-charts'

import { PageContentLayoutModule } from '@ui/page-content-layout'
import { TranslateModule } from '@ngx-translate/core'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { UsersChartComponent, OperationsChartComponent } from './components'
import { DashboardComponent } from './containers'

@NgModule({
  declarations: [
    DashboardComponent,
    OperationsChartComponent,
    UsersChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,

    DashboardRoutingModule,
    PageContentLayoutModule
  ]
})
export class DashboardModule {}
