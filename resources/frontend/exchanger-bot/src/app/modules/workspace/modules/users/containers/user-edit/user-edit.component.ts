import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { TelegramUserApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ITelegramUserDataDto, ITelegramUserInDto } from '@core/models'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: ITelegramUserInDto
  form: FormGroup
  showPassword: boolean

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
      takeUntil(this.destroy$)
    ).subscribe(user =>  {
      this.user = user
      this.form.patchValue({
        discount: user.discount,
        comment: user.comment,
        ban: user.ban,
      })
    })
  }

  save(): void {
    const discount = this.form.get('discount').value
    const comment = this.form.get('comment').value
    const ban = this.form.get('ban').value

    const userData: ITelegramUserDataDto = {
      id: this.user.id,
      comment,
      ban,
    }
    this.telegramUserApiService.updateUser(userData).subscribe(res => this.router.navigateByUrl('/users'))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
