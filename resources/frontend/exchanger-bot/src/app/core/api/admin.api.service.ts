import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import { apiQueryToParams, operationOutToInDto } from '@utils/index'
import { EFilterAdminInOut, IAdminInDto, IAdminLoginInDto, IAdminLoginOutDto, IAdminOutDto } from '@core/features/admin/admin.model'
import { ICommonResponseDto, IRequestApiDto, IResponseApiInDto, IResponseApiOutDto } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IAdminLoginInDto> {
    return this.http.post<ICommonResponseDto<IAdminLoginOutDto>>(`${ENV.api}/auth/login`, { email, password }).pipe(
      map(({ data: userData }) => ({
        accessToken: userData.access_token,
        tokenType: userData.token_type,
        expiresIn: userData.expires_in,
        user: this.adminOutToInDto(userData.user)
      }))
    )
  }

  getAuthAdmin(): Observable<IAdminInDto> {
    return this.http.get<ICommonResponseDto<IAdminOutDto>>(`${ENV.api}/auth/me`).pipe(
      map(({ data: user }) => this.adminOutToInDto(user))
    )
  }

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<IAdminInDto[]> | any> {
    const params = apiQueryToParams(apiQuery, EFilterAdminInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<IAdminOutDto[]>>>(`${ENV.api}/users`, { params }).pipe(
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort,
        data: res.data.map(user => this.adminOutToInDto(user))
      }))
    )
  }

  getAdmin(id: number): Observable<IAdminInDto> {
    return this.http.get<ICommonResponseDto<IAdminOutDto>>(`${ENV.api}/users/${id}`).pipe(
      map(({ data: user }) => this.adminOutToInDto(user))
    )
  }

  updateAdmin(user: IAdminInDto): Observable<IAdminInDto> {
    const userOutDto: IAdminOutDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      subscribe: user.subscribe
    }

    if (user.password && user.cPassword) {
      userOutDto.password = user.password
      userOutDto.c_password = user.cPassword
    }

    return this.http.put<ICommonResponseDto<IAdminOutDto>>(`${ENV.api}/users/${user.id}`, userOutDto).pipe(
      map(({ data: user }) => this.adminOutToInDto(user))
    )
  }

  addAdmin(user: IAdminInDto): Observable<any> {
    const userOutDto: IAdminOutDto = {
      name: user.name,
      email: user.email,
      password: user.password,
      c_password: user.cPassword,
      subscribe: user.subscribe
    }
    return this.http.post<ICommonResponseDto<IAdminOutDto>>(`${ENV.api}/users`, userOutDto).pipe(
      map(({ data: user }) => this.adminOutToInDto(user))
    )
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<ICommonResponseDto<null>>(`${ENV.api}/users/${id}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message)))
    )
  }

  private adminOutToInDto(user: IAdminOutDto): IAdminInDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
      operationsCountToday: user.operations_count_today,
      operationsSumToday: user.operations_sum_today,
      usersCountToday: user.users_count_today,
      operationsWait: user.operations_wait,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
      subscribe: user.subscribe ? new Date(user.subscribe) : null
    }
  }

}
