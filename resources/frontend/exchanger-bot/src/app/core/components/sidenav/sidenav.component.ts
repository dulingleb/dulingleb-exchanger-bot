import { Component, Inject, OnInit } from '@angular/core'

import { IUserFacade, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(@Inject(USER_FACADE) public userFacade: IUserFacade) { }

  ngOnInit(): void {
  }

}
