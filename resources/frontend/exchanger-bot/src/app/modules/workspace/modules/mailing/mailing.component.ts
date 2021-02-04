import { Component, Inject, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { MailingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
})
export class MailingComponent implements OnDestroy {

  form: FormGroup
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private mailingApiService: MailingApiService
  ) {
    this.form = new FormGroup({
      message: new FormControl(''),
    })
  }

  addMessage(): void {
    this.inRequest = true
    const message = this.form.get('message').value

    this.mailingApiService.addMessage(message).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
