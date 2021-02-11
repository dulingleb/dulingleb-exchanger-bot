import { Component, Inject, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { finalize, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { MailingApiService } from '@core/api'
import { ICommonResponseDto } from '@core/models'
import { IUiFacade, UI_FACADE } from '@core/features'

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
})
export class MailingComponent implements OnDestroy {

  form: FormGroup
  inRequest: boolean
  errors: { [key: string]: string[] } = {}

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
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private showSuccess(res: ICommonResponseDto<string>): void {
    this.uiFacade.addInfoNotification(res.message)
  }

  private showError(err: ICommonResponseDto<null>): void {
    this.inRequest = false
    this.errors = err?.errors || {}
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
    this.uiFacade.addErrorNotification(err.message)
  }

}
