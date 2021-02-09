import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-status-info-block-statistic',
  templateUrl: './status-info-block-statistic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusInfoBlockStatisticComponent {
  @Input() inRequest: boolean
  @Input() status: number
  @Output() changeStatus = new EventEmitter()
}
