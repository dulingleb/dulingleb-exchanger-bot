import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { OperationApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'
import { IOperationInDto, ITelegramUserDataDto } from '@core/models'

@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
})
export class OperationInfoComponent implements OnInit, OnDestroy {

  operation: IOperationInDto
  form: FormGroup
  inRequest: boolean

  private destroy$ = new Subject()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private operationApiService: OperationApiService
  ) {
    this.form = new FormGroup({
      comment: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.inRequest = true
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.operationApiService.getOperation(+params.get('id'))),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(operation =>  {
      this.operation = operation
      this.initFormData()
    })
  }

  addComment(): void {
    this.inRequest = true
    const comment = this.form.get('comment').value
    this.operationApiService.addComment(this.operation.id, comment).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    )
    .subscribe(
      (res) => {
        this.operation = res.data
        this.initFormData()
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private initFormData(): void {
    this.form.patchValue({
      comment: this.operation.comment,
    })
  }

}
