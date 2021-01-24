import { ChangeDetectionStrategy } from '@angular/core'
import { Component, Inject } from '@angular/core'

import { IUserFacade, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {

  constructor(@Inject(USER_FACADE) public userFacade: IUserFacade) {}

}
