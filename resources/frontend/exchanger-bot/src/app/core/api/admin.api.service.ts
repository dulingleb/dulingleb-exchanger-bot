import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import { apiQueryToParams, operationOutToInDto } from '@utils/index'
import { EFilterUserInOut, IUserInDto, IUserOutDto } from '@core/features'
import { ICommonResponseDto, IRequestApiDto, IResponseApiInDto, IResponseApiOutDto } from '@core/models'

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {

  constructor(private http: HttpClient) {}

  getList(apiQuery: IRequestApiDto): Observable<IResponseApiInDto<IUserInDto[]> | any> {
    const params = apiQueryToParams(apiQuery, EFilterUserInOut)
    return this.http.get<ICommonResponseDto<IResponseApiOutDto<IUserOutDto[]>>>(`${ENV.api}/users`, { params }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: res }) => ({
        ...operationOutToInDto(res),
        sort: apiQuery.sort,
        data: res.data.map(user => this.userOutToInDto(user))
      }))
    )
  }

  getUser(id: number): Observable<IUserInDto> {
    return this.http.get<ICommonResponseDto<IUserOutDto>>(`${ENV.api}/users/${id}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: user }) => this.userOutToInDto(user))
    )
  }

  updateUser(user: IUserInDto): Observable<IUserInDto> {
    return this.http.put<ICommonResponseDto<IUserOutDto>>(`${ENV.api}/users/${user.id}`, user).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: user }) => this.userOutToInDto(user))
    )
  }

  addUser(user: IUserInDto): Observable<any> {
    const userOutDto: IUserOutDto = {
      name: user.name,
      email: user.email,
      password: user.password,
      c_password: user.cPassword
    }
    return this.http.post<ICommonResponseDto<IUserOutDto>>(`${ENV.api}/users`, userOutDto).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: user }) => this.userOutToInDto(user))
    )
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<ICommonResponseDto<null>>(`${ENV.api}/users/${id}`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message)))
    )
  }

  private userOutToInDto(user: IUserOutDto): IUserInDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at)
    }
  }

}
