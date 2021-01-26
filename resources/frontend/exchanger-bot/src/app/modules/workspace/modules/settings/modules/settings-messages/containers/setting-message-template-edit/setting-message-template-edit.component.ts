import { FormControl, FormGroup } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ISettingMessageDto } from '@core/models'

@Component({
  selector: 'app-setting-message-template-edit',
  templateUrl: './setting-message-template-edit.component.html',
})
export class SettingMessageTemplateEditComponent implements OnInit, OnDestroy {

  form: FormGroup
  message: ISettingMessageDto
  inRequest: boolean

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
      message: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.settingApiService.getMessage(params.get('id'))),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (message) => {
        this.message = message
        this.form.patchValue({
          title: message.title
        })
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  save(): void {
    const message = this.form.get('message').value

    this.settingApiService.updateMessage(message, '').subscribe(
      () => this.router.navigateByUrl('/users'),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
