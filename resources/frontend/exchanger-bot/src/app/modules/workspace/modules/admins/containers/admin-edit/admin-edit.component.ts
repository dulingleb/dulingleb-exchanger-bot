import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { IUiFacade, IUserInDto, UI_FACADE } from '@core/features'

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
})
export class AdminEditComponent implements OnInit, OnDestroy {

  user: IUserInDto
  form: FormGroup
  showPassword: boolean
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminApiService: AdminApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
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
        return id ? this.adminApiService.getUser(id) : of({} as IUserInDto)
      }),
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
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    const cPassword = this.form.get('confirmPassword').value

    this.user.id
      ? this.updateUser(this.user.id, email || this.user.email, name || this.user.name)
      : this.addUser(email, name, password, cPassword)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private updateUser(id: number, email: string, name: string): void {
    this.adminApiService.updateUser({ id, email, name}).subscribe(
      () => this.router.navigateByUrl('/admins'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  private addUser(email: string, name: string, password: string, cPassword: string): void {
    this.adminApiService.addUser({ email, name, password, cPassword}).subscribe(
      () => this.router.navigateByUrl('/admins'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

}
