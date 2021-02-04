import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { IUiFacade, IAdminInDto, UI_FACADE, EAdminRoleDto, ADMIN_FACADE, IAdminFacade } from '@core/features'

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
})
export class AdminEditComponent implements OnInit, OnDestroy {

  admin: IAdminInDto
  form: FormGroup
  showPassword: boolean
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
        Validators.email
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
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        const id = +params.get('id')
        return id ? this.adminApiService.getAdmin(id) : of({} as IAdminInDto)
      }),
      withLatestFrom(this.adminFacade.admin$),
      takeUntil(this.destroy$)
    ).subscribe(
      ([admin, currentAdmin]) =>  {
      this.admin = admin
        this.form.patchValue({
          email: admin.email,
          name: admin.name
        })
        if (currentAdmin.role === EAdminRoleDto.SUPER_ADMIN) {
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

    this.admin.id
      ? this.updateAdmin(this.admin.id, email || this.admin.email, name || this.admin.name)
      : this.addAdmin(email, name, password, cPassword)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private updateAdmin(id: number, email: string, name: string): void {
    this.adminApiService.updateAdmin({ id, email, name}).subscribe(
      () => this.router.navigateByUrl('/admins'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  private addAdmin(email: string, name: string, password: string, cPassword: string): void {
    this.adminApiService.addAdmin({ email, name, password, cPassword}).subscribe(
      () => this.router.navigateByUrl('/admins'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

}
