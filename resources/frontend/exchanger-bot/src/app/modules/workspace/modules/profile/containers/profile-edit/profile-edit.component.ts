import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { IUiFacade, IAdminFacade, IAdminInDto, UI_FACADE, ADMIN_FACADE } from '@core/features'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  user: IAdminInDto
  form: FormGroup
  showPassword: boolean
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private adminApiService: AdminApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    @Inject(ADMIN_FACADE) private adminFacade: IAdminFacade,

  ) {
    this.form = new FormGroup({
      email: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        // Validators.required,
        Validators.minLength(3)
      ]),
      confirmPassword: new FormControl('', [
        // Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.adminFacade.admin$.pipe(
      mergeMap(user => this.adminApiService.getAdmin(+user.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (user) =>  {
      this.user = user
        this.form.patchValue({
          email: user.email,
          name: user.name
        })
      },
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  save(): void {
    const name = this.form.get('name').value
    const password = this.form.get('password').value
    const cPassword = this.form.get('confirmPassword').value

    this.updateUser(this.user.id, this.user.email, name || this.user.name, password, cPassword)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private updateUser(id: number, email: string, name: string, password: string, cPassword: string): void {
    this.inRequest = true

    const user: IAdminInDto = { id, email, name }
    if (password && cPassword) {
      user.password = password
      user.cPassword = cPassword
    }
    this.adminApiService.updateAdmin(user).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => this.router.navigateByUrl('/profile'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

}
