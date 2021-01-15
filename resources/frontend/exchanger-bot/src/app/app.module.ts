import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { HttpClientModule } from '@angular/common/http'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FooterModule, HeaderModule, SidenavModule } from '@core/components'
import { AppStoreModule } from '@core/features'

import { TranslationModule } from './translation.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,

    TranslationModule,
    AppRoutingModule,
    AppStoreModule,
    SidenavModule,
    HeaderModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
