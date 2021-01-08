import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FooterModule, HeaderModule } from '@core/components'
import { AppStoreModule } from '@core/features'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,

    AppStoreModule,
    HeaderModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
