import { Component, Inject, OnDestroy, OnInit } from '@angular/core'

import { IPaginator } from '@ui/index'
import { EUserRoleDto, IUserFacade, IUserInDto, USER_FACADE } from '@core/features'
import { BehaviorSubject, Subject } from 'rxjs'
import { catchError, takeUntil, withLatestFrom } from 'rxjs/operators'
import { IRequestApiDto } from '@core/models'
import { AdminApiService } from '@core/api'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
})
export class AdminsComponent implements OnInit, OnDestroy {

  currentUserRole: EUserRoleDto = EUserRoleDto.ADMIN
  users: IUserInDto[] = [
    {
      id: 1,
      name: 'n1',
      email: 'email1',
      createdAt: new Date()
    } as IUserInDto,
    {
      id: 2,
      name: 'n2',
      email: 'email2',
      createdAt: new Date()
    } as IUserInDto,
    {
      id: 3,
      name: 'n3',
      email: 'email3',
      createdAt: new Date()
    } as IUserInDto,
  ]

  private destroy$ = new Subject()
  private requestApiQuery = new BehaviorSubject<IRequestApiDto>({ page: 0, pageSize: 10, query: '' })

  constructor(
    @Inject(USER_FACADE) public userFacade: IUserFacade,
    private adminApiService: AdminApiService
  ) {}

  ngOnInit(): void {
    this.requestApiQuery.pipe(
      takeUntil(this.destroy$)
    ).subscribe(req => this.getAdminList(req))
  }

  changePaginator(paginator: IPaginator): void {
    this.requestApiQuery.next({
      page: paginator.page,
      pageSize: paginator.pageSize,
      query: ''
    })
  }

  getAdminList(req: IRequestApiDto): void {
    this.adminApiService.getList().pipe(
      withLatestFrom(this.userFacade.user$),
      takeUntil(this.destroy$)
    ).subscribe(([user, res]) => {
      console.log('user, res', user, res)
    }, (err) => console.log('err', err))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
