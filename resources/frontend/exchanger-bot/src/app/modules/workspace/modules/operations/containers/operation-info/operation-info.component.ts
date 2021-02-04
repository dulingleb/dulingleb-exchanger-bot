import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { IOperationInDto } from '@core/models'
import { OperationApiService } from '@core/api'
import { IUiFacade, UI_FACADE } from '@core/features'

import { EOperationStatus, OPERATION_CLASS } from '../../constants'

@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
})
export class OperationInfoComponent implements OnInit, OnDestroy {

  operation: IOperationInDto
  form: FormGroup
  inRequest: boolean
  OPERATION_CLASS = OPERATION_CLASS
  EOperationStatus = EOperationStatus

  private destroy$ = new Subject()

  constructor(
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
      mergeMap((params: ParamMap) => this.operationApiService.getOperation(+params.get('id')).pipe(
        finalize(() => this.inRequest = false)
      )),
      takeUntil(this.destroy$)
    ).subscribe(operation =>  {
      console.log('this.inRequest', this.inRequest)
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
    ).subscribe(
      (res) => {
        this.operation = res.data
        this.initFormData()
        this.uiFacade.addInfoNotification(res.message)
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  setSuccess(): void {
    this.inRequest = true
    this.operationApiService.setSuccess(this.operation.id).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        console.log('res', res)
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  setCancel(): void {
    this.inRequest = true
    this.operationApiService.setCancel(this.operation.id).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        console.log('res', res)
      },
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  setToOperator(): void {
    this.inRequest = true
    this.operationApiService.setToOperator(this.operation.id).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        console.log('res', res)
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
