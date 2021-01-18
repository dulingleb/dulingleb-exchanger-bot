import { Component, Inject, OnInit } from '@angular/core'

import { IUiFacade, UI_FACADE, IUserFacade, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    @Inject(UI_FACADE) public uiFacade: IUiFacade,
  ) {}

  ngOnInit(): void {
    this.userFacade.init()
    this.uiFacade.init()
  }

}
