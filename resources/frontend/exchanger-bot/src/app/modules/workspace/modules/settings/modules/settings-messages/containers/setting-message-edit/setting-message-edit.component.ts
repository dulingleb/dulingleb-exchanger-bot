import { FormControl, FormGroup } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { CKEditor5 } from '@ckeditor/ckeditor5-angular'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ISettingMessageDto } from '@core/models'

@Component({
  selector: 'app-setting-message-edit',
  templateUrl: './setting-message-edit.component.html',
})
export class SettingMessageEditComponent implements OnInit, OnDestroy {

  form: FormGroup
  message: ISettingMessageDto
  inRequest: boolean

  Editor = ClassicEditor

  config: CKEditor5.Config = {
    toolbar: [ 'bold', 'italic', '|', 'undo', 'redo' ]
  }

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
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.settingApiService.getMessage(params.get('slug'))),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (message) => {
        this.message = message
        this.form.patchValue({ text: message.text })
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  save(): void {
    const text = this.form.get('text').value

    this.settingApiService.updateMessage(this.message.id, text).subscribe(
      (res) => {
        this.router.navigateByUrl('/settings/messages')
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
