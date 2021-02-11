import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { finalize, mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { TelegramUserApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ETelegramUserRole, ICommonResponseDto, ITelegramUserDataDto, ITelegramUserInDto } from '@core/models'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: ITelegramUserInDto
  form: FormGroup
  showPassword: boolean
  existAdmin = true
  isAdmin = false
  inRequest: boolean
  errors: { [key: string]: string[] } = {}

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private telegramUserApiService: TelegramUserApiService
  ) {
    this.form = new FormGroup({
      discount: new FormControl('', [Validators.min(0), Validators.max(100)]),
      comment: new FormControl(''),
      ban: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.telegramUserApiService.getUser(+params.get('id'))),
      withLatestFrom(this.telegramUserApiService.existsAdmin()),
      takeUntil(this.destroy$)
    ).subscribe(
      ([user, existAdmin]) => {
        this.inRequest = false
        this.user = user
        this.isAdmin = this.user.role === ETelegramUserRole.ADMIN
        this.existAdmin = existAdmin
        this.form.patchValue({
          discount: user.discount,
          comment: user.comment,
          ban: user.ban,
        })
      },
      (err) => this.showError(err),
    )

  }

  save(): void {
    this.inRequest = true
    const discount = this.form.get('discount').value
    const comment = this.form.get('comment').value
    const ban = this.form.get('ban').value

    const userData: ITelegramUserDataDto = {
      id: this.user.id,
      discount,
      comment,
      ban,
    }
    this.telegramUserApiService.updateUser(userData).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err),
    )
  }

  appointAdmin(): void {
    this.inRequest = true
    const appointRole = this.user.role === ETelegramUserRole.ADMIN ? ETelegramUserRole.USER : ETelegramUserRole.ADMIN
    this.telegramUserApiService.appointAdmin(this.user.id, appointRole).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        this.user.role = res.data.role
        this.existAdmin = this.user.role === ETelegramUserRole.ADMIN
        this.isAdmin = this.user.role === ETelegramUserRole.ADMIN
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.showError(err),
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private showSuccess(res: ICommonResponseDto<ITelegramUserDataDto>): void {
    this.uiFacade.addInfoNotification(res.message)
    this.router.navigateByUrl('/users')
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
