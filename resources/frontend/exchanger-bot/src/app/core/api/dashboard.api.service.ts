import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

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
      map(({ data }) => data)
    )
  }

  getUsers(period: 'month' | 'week'): Observable<IDashboardChart[]> {
    const params = { period }
    return this.http.get<ICommonResponseDto<IDashboardChart[]>>(`${ENV.api}/dashboard/users`, { params }).pipe(
      map(({ data }) => data)
    )
  }

}
