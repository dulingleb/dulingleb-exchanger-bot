import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { UserFacade, USER_FACADE } from '@core/features/user'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  showPassword: boolean
  authForm: FormGroup

  constructor(@Inject(USER_FACADE) public userFacade: UserFacade) {
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
    this.userFacade.login(email, password)
  }

}
