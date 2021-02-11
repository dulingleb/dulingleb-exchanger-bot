import { FormControl, FormGroup } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ICommonResponseDto, ISettingMessageDto } from '@core/models'

@Component({
  selector: 'app-setting-message-edit',
  templateUrl: './setting-message-edit.component.html',
})
export class SettingMessageEditComponent implements OnInit, OnDestroy {

  form: FormGroup
  message: ISettingMessageDto
  inRequest: boolean
  errors: { [key: string]: string[] } = {}

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private settingApiService: SettingApiService,
  ) {
    this.form = new FormGroup({
      text: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.settingApiService.getMessage(params.get('slug')).pipe(
        finalize(() => this.inRequest = false),
        takeUntil(this.destroy$)
      )),
      takeUntil(this.destroy$)
    ).subscribe(
      (message) => {
        this.message = message
        this.form.patchValue({ text: message.text })
      },
      (err) => this.showError(err)
    )
  }

  save(): void {
    this.inRequest = true
    const text = this.form.get('text').value

    this.settingApiService.updateMessage(this.message.id, text).pipe(
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

  private showSuccess(res: ICommonResponseDto<ISettingMessageDto>): void {
    this.router.navigateByUrl('/settings/messages')
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
