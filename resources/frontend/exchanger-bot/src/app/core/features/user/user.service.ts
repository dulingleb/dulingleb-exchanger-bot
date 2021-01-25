import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, mergeMap } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { ENV } from '@env/environment'
import { ICommonResponseDto } from '@core/models'

import { IUserInDto, IUserLoginInDto, IUserLoginOutDto, IUserOutDto } from './user.model'

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUserLoginInDto> {
    return this.http.post<ICommonResponseDto<IUserLoginOutDto>>(`${ENV.api}/auth/login`, { email, password }).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: userData }) => ({
        accessToken: userData.access_token,
        tokenType: userData.token_type,
        expiresIn: userData.expires_in,
        user: {
          id: userData.user.id,
          name: userData.user.name,
          email: userData.user.email,
          role: userData.user.role_id,
          createdAt: new Date(userData.user.created_at),
          updatedAt: new Date(userData.user.updated_at)
        }
      }))
    )
  }

  getAuthUser(): Observable<IUserInDto> {
    return this.http.get<ICommonResponseDto<IUserOutDto>>(`${ENV.api}/auth/me`).pipe(
      mergeMap(res => res.status ? of(res) : throwError(new Error(res.message))),
      map(({ data: user }) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_id,
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at)
      }))
    )
  }

}
