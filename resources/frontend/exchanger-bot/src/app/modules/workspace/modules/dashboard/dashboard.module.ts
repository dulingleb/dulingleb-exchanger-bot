import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChartsModule } from 'ng2-charts'

import { PageContentLayoutModule } from '@ui/page-content-layout'
import { TranslateModule } from '@ngx-translate/core'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { BarChartComponent, LineChartComponent } from './components'
import { DashboardComponent } from './containers'

@NgModule({
  declarations: [
    DashboardComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    TranslateModule,

    DashboardRoutingModule,
    PageContentLayoutModule
  ]
})
export class DashboardModule {}
