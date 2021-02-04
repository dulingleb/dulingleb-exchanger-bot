import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { IUiFacade, IAdminFacade, IAdminInDto, UI_FACADE, ADMIN_FACADE, EAdminRoleDto } from '@core/features'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  admin: IAdminInDto
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
        Validators.minLength(3)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.adminFacade.admin$.pipe(
      mergeMap(admin => this.adminApiService.getAdmin(+admin.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (admin) =>  {
      this.admin = admin
        this.form.patchValue({
          email: admin.email,
          name: admin.name
        })
        if (this.admin.role === EAdminRoleDto.SUPER_ADMIN) {
          this.form.get('email').enable()
        }
      },
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  save(): void {
    const name = this.form.get('name').value
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    const cPassword = this.form.get('confirmPassword').value

    this.updateAdmin(this.admin.id, email || this.admin.email, name || this.admin.name, password, cPassword)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private updateAdmin(id: number, email: string, name: string, password: string, cPassword: string): void {
    this.inRequest = true

    const admin: IAdminInDto = { id, email, name }
    if (password && cPassword) {
      admin.password = password
      admin.cPassword = cPassword
    }
    this.adminApiService.updateAdmin(admin).pipe(
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
