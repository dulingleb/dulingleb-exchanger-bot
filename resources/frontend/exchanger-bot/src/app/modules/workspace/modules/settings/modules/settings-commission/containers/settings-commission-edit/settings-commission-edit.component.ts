import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

import { SettingApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ICommonResponseDto, ISettingCommissionDto } from '@core/models'

@Component({
  selector: 'app-settings-commission-edit',
  templateUrl: './settings-commission-edit.component.html',
  styleUrls: ['./settings-commission-edit.component.scss']
})
export class SettingsCommissionEditComponent implements OnInit, OnDestroy {

  commission: ISettingCommissionDto
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
      from: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      to: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      percent: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => {
        const id = +params.get('id')
        return id ? this.settingApiService.getCommission(id) : of({} as ISettingCommissionDto)
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (commission) =>  {
        this.inRequest = false
        this.commission = commission
        this.form.patchValue({
          from: commission.from,
          to: commission.to,
          percent: commission.percent
        })
      },
      (err) => this.showError(err)
    )
  }

  save(): void {
    const from = this.form.get('from').value
    const to = this.form.get('to').value
    const percent = this.form.get('percent').value
    const requisite = {
      ...this.commission,
      from,
      to,
      percent
    }

    this.commission.id
      ? this.updateRequisite(requisite)
      : this.addRequisite(requisite)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private updateRequisite(commission: ISettingCommissionDto): void {
    this.inRequest = true
    this.settingApiService.updateCommission(commission).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  private addRequisite(commission: ISettingCommissionDto): void {
    this.inRequest = true
    this.settingApiService.addCommission(commission).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  private showSuccess(res: ICommonResponseDto<ISettingCommissionDto>): void {
    this.router.navigateByUrl('/settings/commissions')
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
