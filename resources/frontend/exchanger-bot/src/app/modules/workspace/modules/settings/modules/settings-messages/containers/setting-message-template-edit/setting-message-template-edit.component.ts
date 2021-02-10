import { FormControl, FormGroup } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ICommonResponseDto, ISettingMessageDto } from '@core/models'

@Component({
  selector: 'app-setting-message-template-edit',
  templateUrl: './setting-message-template-edit.component.html',
})
export class SettingMessageTemplateEditComponent implements OnInit, OnDestroy {

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
      title: new FormControl(''),
      slug: new FormControl(''),
      description: new FormControl(''),
      text: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        const id = +params.get('id')
        return id ? this.settingApiService.getMessageTemplate(id) : of({} as ISettingMessageDto)
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (message) => {
        this.inRequest = false
        this.message = message
        this.form.patchValue({
          title: message.title,
          slug: message.slug,
          description: message.description,
          text: message.text,
        })
      },
      (err) => this.showError(err)
    )
  }

  save(): void {
    const title = this.form.get('title').value
    const slug = this.form.get('slug').value
    const description = this.form.get('description').value
    const text = this.form.get('text').value

    const message: ISettingMessageDto = {
      ...this.message,
      title,
      slug,
      description,
      text
    }

    this.message.id
      ? this.updateMessageTemplate(message)
      : this.addMessageTemplate(message)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private addMessageTemplate(message: ISettingMessageDto): void {
    this.inRequest = true
    this.settingApiService.addMessageTemplate(message).subscribe(
      (res) => {
        this.router.navigateByUrl('/settings/messages')
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.showError(err)
    )
  }

  private updateMessageTemplate(message: ISettingMessageDto): void {
    this.inRequest = true
    this.settingApiService.updateMessageTemplate(message).subscribe(
      (res) => {
        this.router.navigateByUrl('/settings/messages')
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.showError(err)
    )
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
