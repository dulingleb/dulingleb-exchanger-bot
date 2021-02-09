import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { IAdminUsersCountInfoInDto } from '@core/features'

@Component({
  selector: 'app-status-info-block-users',
  templateUrl: './status-info-block-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusInfoBlockUsersComponent {
  @Input() countUsersInfo: IAdminUsersCountInfoInDto
}
