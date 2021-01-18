import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { MatSidenavModule } from '@angular/material/sidenav'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FooterModule, HeaderModule, SidenavModule } from '@core/components'
import { AuthInterceptor } from '@core/interceptors'
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
