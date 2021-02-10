import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { filter, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminFacade, ADMIN_FACADE, IUiFacade, UI_FACADE } from '@core/features'
import { ICommonResponseDto } from '@core/models'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  showPassword: boolean
  form: FormGroup
  errors: { [key: string]: string[] } = {}

  private destroy$ = new Subject()

  constructor(
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    @Inject(ADMIN_FACADE) public adminFacade: AdminFacade
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit(): void {
    this.adminFacade.error$.pipe(
      filter(error => !!error),
      takeUntil(this.destroy$)
    ).subscribe(err => this.showError(err))
  }

  login(): void {
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    this.adminFacade.login(email, password)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private showError(err: ICommonResponseDto<null>): void {
    this.errors = err?.errors || {}
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
    this.uiFacade.addErrorNotification(err.message)
  }

}
