import { Component, Inject, OnInit } from '@angular/core'

import { UserApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(@Inject(UI_FACADE) public uiFacade: IUiFacade, private userApiService: UserApiService) {}

  ngOnInit(): void {
    this.uiFacade.initUi()
    this.userApiService.login('', '')
  }

}
