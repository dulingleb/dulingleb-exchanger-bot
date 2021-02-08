import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import { ICommonResponseDto, IDashboardChart } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {

  constructor(private http: HttpClient) {}

  getOperations(type: 'sum' | 'count', period: 'month' | 'week'): Observable<IDashboardChart[]> {
    const params = { type, period }
    return this.http.get<ICommonResponseDto<IDashboardChart[]>>(`${ENV.api}/dashboard/operations`, { params }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data }) => data)
    )
  }

  getUsers(period: 'month' | 'week'): Observable<IDashboardChart[]> {
    const params = { period }
    return this.http.get<ICommonResponseDto<IDashboardChart[]>>(`${ENV.api}/dashboard/users`, { params }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data }) => data)
    )
  }

}
