import { Component, Inject, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { IUiFacade, UI_FACADE, IAdminFacade, ADMIN_FACADE, APP_DEFAULT_LANGUAGE } from '@core/features'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
    @Inject(UI_FACADE) public uiFacade: IUiFacade,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(APP_DEFAULT_LANGUAGE)
  }

  ngOnInit(): void {
    this.adminFacade.init()
    this.uiFacade.init()
  }

}
