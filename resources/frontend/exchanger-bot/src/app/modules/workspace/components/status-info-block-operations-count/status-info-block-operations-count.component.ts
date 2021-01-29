import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-status-info-block-operations-count',
  templateUrl: './status-info-block-operations-count.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusInfoBlockOperationsCountComponent {
  @Input() countOperations: number
}
