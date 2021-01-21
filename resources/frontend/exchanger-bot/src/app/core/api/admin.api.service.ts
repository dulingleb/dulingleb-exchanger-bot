import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { ENV } from '@env/environment'
import { apiQueryToParams } from '@utils/index'
import { IUserInDto, IUserOutDto } from '@core/features'
import { IRequestApiDto, IResponseApiInDto, IResponseApiOutDto } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {

  constructor(private http: HttpClient) {}

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<IUserInDto[]>> {
    const params = apiQueryToParams(apiQuery)
    return this.http.get<IResponseApiOutDto<IUserOutDto[]>>(`${ENV.api}/users`, { params }).pipe(
      map(res => ({
        currentPage: res.current_page,
        page: res.from,
        lastPage: res.last_page,
        pageSize: res.per_page,
        to: res.to,
        total: res.total,
        sort: apiQuery.sort,
        data: res.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role_id,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at)
        }))
      }))
    )
  }

}
