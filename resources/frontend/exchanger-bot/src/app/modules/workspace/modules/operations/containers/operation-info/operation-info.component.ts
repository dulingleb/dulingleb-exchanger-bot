import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { finalize, mergeMap, takeUntil } from 'rxjs/operators'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { Subject } from 'rxjs'

import { ICommonResponseDto, IOperationInDto } from '@core/models'
import { IUiFacade, UI_FACADE } from '@core/features'
import { ImageModalService } from '@ui/image-modal'
import { OperationApiService } from '@core/api'

import { EOperationStatus, OPERATION_CLASS } from '../../constants'

@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
  styleUrls: ['./operation-info.component.scss']
})
export class OperationInfoComponent implements OnInit, OnDestroy {

  operation: IOperationInDto
  form: FormGroup
  inRequest: boolean
  errors: { [key: string]: string[] } = {}
  OPERATION_CLASS = OPERATION_CLASS
  EOperationStatus = EOperationStatus

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [ '<button><</button>', '<button>></button>' ],
    responsive: {
      0: {
        items: 1
      },
      1440: {
        items: 2
      }
    },
    nav: true
  }

  private destroy$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    public imageModalService: ImageModalService,
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
      (err) => this.showError(err)
    )
  }

  setSuccess(): void {
    this.inRequest = true
    this.operationApiService.setSuccess(this.operation.id).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => this.uiFacade.addInfoNotification(res.message),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  setCancel(): void {
    this.inRequest = true
    this.operationApiService.setCancel(this.operation.id).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => this.uiFacade.addInfoNotification(res.message),
      (err) => this.uiFacade.addErrorNotification(err.message)
    )
  }

  setToOperator(): void {
    this.inRequest = true
    this.operationApiService.setToOperator(this.operation.id).pipe(
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => this.uiFacade.addInfoNotification(res.message),
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

  private showError(err: ICommonResponseDto<null>): void {
    this.inRequest = false
    this.errors = err?.errors || {}
    for (const errKey of Object.keys(this.errors)) {
      this.form.get(errKey)?.setErrors({ valid: false })
    }
    this.uiFacade.addErrorNotification(err.message)
  }

}
