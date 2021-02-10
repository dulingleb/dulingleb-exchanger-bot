import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorComponent {

  @Input() name: string
  @Input() errors: string

}
