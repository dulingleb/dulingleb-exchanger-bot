import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-status-info-block-operations-summ',
  templateUrl: './status-info-block-operations-summ.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusInfoBlockOperationsSummComponent {
  @Input() operationsSumm: number
}
