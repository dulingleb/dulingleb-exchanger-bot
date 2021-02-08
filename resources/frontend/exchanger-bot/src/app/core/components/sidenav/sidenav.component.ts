import { ChangeDetectionStrategy } from '@angular/core'
import { Component, Inject } from '@angular/core'

import { APP_COMMON } from '@const/app.constant'
import { EAdminRoleDto, IAdminFacade, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {

  EUserRoleDto = EAdminRoleDto
  APP_COMMON = APP_COMMON

  constructor(@Inject(ADMIN_FACADE) public adminFacade: IAdminFacade) {}

}
