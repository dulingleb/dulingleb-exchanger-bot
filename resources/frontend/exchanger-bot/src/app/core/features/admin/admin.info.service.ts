import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { ENV } from '@env/environment'
import { ICommonResponseDto } from '@core/models'

import { IAdminOperationsCountInfoInDto, IAdminOperationsCountInfoOutDto, IAdminOperationsSumInfoInDto, IAdminOperationsSumInfoOutDto, IAdminUsersCountInfoInDto, IAdminUsersCountInfoOutDto } from './admin.info.model'

@Injectable()
export class AdminInfoService {

  constructor(private http: HttpClient) {}

  getOperationsCount(): Observable<IAdminOperationsCountInfoInDto> {
    return this.http.get<ICommonResponseDto<IAdminOperationsCountInfoOutDto>>(`${ENV.api}/info/operations-count`).pipe(
      map(({ data: operationsData }) => ({
        operationsCount: operationsData.operations_count,
        operationsCountToday: operationsData.operations_count_today
      }))
    )
  }

  getOperationsSum(): Observable<IAdminOperationsSumInfoInDto> {
    return this.http.get<ICommonResponseDto<IAdminOperationsSumInfoOutDto>>(`${ENV.api}/info/operations-sum`).pipe(
      map(({ data: operationsData }) => ({
        operationsSum: operationsData.operations_sum,
        operationsSumToday: operationsData.operations_sum_today
      }))
    )
  }

  getOperationsWait(): Observable<number> {
    return this.http.get<ICommonResponseDto<number>>(`${ENV.api}/info/operations-wait`).pipe(
      map(({ data: operationsData }) => operationsData)
    )
  }

  getUsersCount(): Observable<IAdminUsersCountInfoInDto> {
    return this.http.get<ICommonResponseDto<IAdminUsersCountInfoOutDto>>(`${ENV.api}/info/users-count`).pipe(
      map(({ data: operationsData }) => ({
        usersCount: operationsData.users_count,
        usersCountToday: operationsData.users_count_today
      }))
    )
  }

}
