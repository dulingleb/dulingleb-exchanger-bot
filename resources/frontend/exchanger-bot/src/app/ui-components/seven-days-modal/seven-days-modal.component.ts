import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core'

import { APP_COMMON } from '@const/app.constant'

@Component({
  selector: 'app-seven-days-modal',
  templateUrl: './seven-days-modal.component.html',
  styleUrls: ['./seven-days-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SevenDaysModalComponent implements AfterViewInit {

  showSubTitle = true

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showSubTitle = true
    }, APP_COMMON.subscriptionMinDays)
  }

}
