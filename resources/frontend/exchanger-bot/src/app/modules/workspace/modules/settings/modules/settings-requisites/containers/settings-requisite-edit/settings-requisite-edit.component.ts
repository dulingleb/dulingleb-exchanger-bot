import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ISettingRequisiteDto } from '@core/models'

@Component({
  selector: 'app-settings-requisite-edit',
  templateUrl: './settings-requisite-edit.component.html',
})
export class SettingsRequisiteEditComponent implements OnInit, OnDestroy {

  requisite: ISettingRequisiteDto
  form: FormGroup
  inRequest: boolean

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
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        const id = +params.get('id')
        return id ? this.settingApiService.getRequisite(id) : of({} as ISettingRequisiteDto)
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (requisite) =>  {
      this.requisite = requisite
        this.form.patchValue({
          title: requisite.title,
          text: requisite.text,
          status: requisite.status
        })
      },
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
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
    this.settingApiService.updateRequisite(requisite).subscribe(
      () => this.router.navigateByUrl('/settings/requisites'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

  private addRequisite(requisite: ISettingRequisiteDto): void {
    this.settingApiService.addRequisite(requisite).subscribe(
      () => this.router.navigateByUrl('/settings/requisites'),
      (err) => {
        this.uiFacade.addErrorNotification(err.message)
      }
    )
  }

}
