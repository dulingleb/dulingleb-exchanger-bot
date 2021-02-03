import { Component, Inject, OnInit } from '@angular/core'

import { IUiFacade, UI_FACADE, IAdminFacade, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(ADMIN_FACADE) public adminFacade: IAdminFacade,
    @Inject(UI_FACADE) public uiFacade: IUiFacade,
  ) {}

  ngOnInit(): void {
    this.adminFacade.init()
    this.uiFacade.init()
  }

}
