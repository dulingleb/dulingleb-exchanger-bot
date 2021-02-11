import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ICommonResponseDto, ISettingRequisiteDto } from '@core/models'

@Component({
  selector: 'app-settings-requisite-edit',
  templateUrl: './settings-requisite-edit.component.html',
})
export class SettingsRequisiteEditComponent implements OnInit, OnDestroy {

  requisite: ISettingRequisiteDto
  form: FormGroup
  inRequest: boolean
  errors: { [key: string]: string[] } = {}

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private settingApiService: SettingApiService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl(''),
      status: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        const id = +params.get('id')
        return id ? this.settingApiService.getRequisite(id) : of({} as ISettingRequisiteDto)
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (requisite) =>  {
        this.inRequest = false
        this.requisite = requisite

        this.form.patchValue({
          title: requisite.title,
          text: requisite.text,
          status: requisite.status
        })
      },
      (err) => this.showError(err)
    )
  }

  save(): void {
    const title = this.form.get('title').value
    const text = this.form.get('text').value
    const status = this.form.get('status').value
    const requisite = {
      ...this.requisite,
      title,
      text,
      status
    }

    this.requisite.id
      ? this.updateRequisite(requisite)
      : this.addRequisite(requisite)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private updateRequisite(requisite: ISettingRequisiteDto): void {
    this.inRequest = true
    this.settingApiService.updateRequisite(requisite).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  private addRequisite(requisite: ISettingRequisiteDto): void {
    this.inRequest = true
    this.settingApiService.addRequisite(requisite).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  private showSuccess(res: ICommonResponseDto<ISettingRequisiteDto>): void {
    this.router.navigateByUrl('/settings/requisites')
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
