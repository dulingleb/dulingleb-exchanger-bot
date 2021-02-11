import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { filter, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { Subject } from 'rxjs'

import { ConfirmModalService, IConfirmModal } from '@ui/confirm-modal'
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
      480: {
        items: 2
      },
      780: {
        items: 3
      }
    },
    nav: true
  }

  private destroy$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    public imageModalService: ImageModalService,
    @Inject(UI_FACADE) private uiFacade: IUiFacade,
    private operationApiService: OperationApiService,
    private confirmModalService: ConfirmModalService,
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
        this.showSuccess(res)
      },
      (err) => this.showError(err)
    )
  }

  setSuccess(): void {
    const data: IConfirmModal = {
      titleI18n: 'operation.confirmModal.title',
      titleKeyI18n: `# ${this.operation.id}`,
      messageI18n: 'operation.confirmModal.message',
      messageKeyI18n: '',
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.operationApiService.setSuccess(this.operation.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  setCancel(): void {
    const data: IConfirmModal = {
      titleI18n: 'operation.cancelModal.title',
      titleKeyI18n: `# ${this.operation.id}`,
      messageI18n: 'operation.cancelModal.message',
      messageKeyI18n: '',
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.operationApiService.setCancel(this.operation.id)),
      finalize(() => this.inRequest = false),
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => this.showSuccess(res),
      (err) => this.showError(err)
    )
  }

  setToOperator(): void {
    const data: IConfirmModal = {
      titleI18n: 'operation.operatorModal.title',
      titleKeyI18n: `# ${this.operation.id}`,
      messageI18n: 'operation.operatorModal.message',
      messageKeyI18n: '',
      confirmBtn: true,
      cancelBtn: true
    }
    this.confirmModalService.openDialog(data).pipe(
      filter(res => res),
      tap(() => this.inRequest = true),
      mergeMap(() => this.operationApiService.setToOperator(this.operation.id)),
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

  private initFormData(): void {
    this.form.patchValue({
      comment: this.operation.comment,
    })
  }

  private showSuccess(res: ICommonResponseDto<IOperationInDto>): void {
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
