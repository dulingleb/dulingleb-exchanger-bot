import { ChangeDetectionStrategy } from '@angular/core'
import { Component, Inject } from '@angular/core'

import { EUserRoleDto, IUserFacade, USER_FACADE } from '@core/features'

@Component({
  selector: 'app-side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {

  EUserRoleDto = EUserRoleDto

  constructor(@Inject(USER_FACADE) public userFacade: IUserFacade) {}

}
