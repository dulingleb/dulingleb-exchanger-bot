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

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${ENV.api}/users/${id}`).pipe(
      map(res => ({
        status: res.status,
        data: res.data
      }))
    )
  }

  updateUser(user: IUserInDto): Observable<any> {
    return this.http.put(`${ENV.api}/users/${user.id}`, user)
  }

  addUser(user: IUserInDto): Observable<any> {
    const userOutDto: IUserOutDto = {
      name: user.name,
      email: user.email,
      password: user.password,
      c_password: user.cPassword
    }
    return this.http.post(`${ENV.api}/users`, userOutDto)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${ENV.api}/users/${id}`)
  }

}
