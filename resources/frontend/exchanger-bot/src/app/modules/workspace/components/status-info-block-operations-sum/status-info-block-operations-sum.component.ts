import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { IAdminOperationsSumInfoInDto } from '@core/features'

@Component({
  selector: 'app-status-info-block-operations-sum',
  templateUrl: './status-info-block-operations-sum.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusInfoBlockOperationsSumComponent {
  @Input() operationsSumInfo: IAdminOperationsSumInfoInDto
}
