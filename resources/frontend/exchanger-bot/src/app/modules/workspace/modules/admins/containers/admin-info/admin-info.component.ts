import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { mergeMap } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { AdminApiService } from '@core/api'
import { IUserInDto } from '@core/features'

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
})
export class AdminInfoComponent implements OnInit, OnDestroy {

  user: IUserInDto

  private destroy$ = new Subject()

  constructor(
    private route: ActivatedRoute,
    private adminApiService: AdminApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap((params: ParamMap) => this.adminApiService.getUser(+params.get('id')))
    ).subscribe(user =>  {
      this.user = user
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
