import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { AdminFacade, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  showPassword: boolean
  authForm: FormGroup

  constructor(@Inject(ADMIN_FACADE) public adminFacade: AdminFacade) {
    this.authForm = new FormGroup({
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

  login(): void {
    const email = this.authForm.get('email').value
    const password = this.authForm.get('password').value
    this.adminFacade.login(email, password)
  }

}
