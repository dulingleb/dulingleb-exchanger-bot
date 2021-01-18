import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ENV } from '@env/environment'

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): void {
    this.http.get(ENV.api).subscribe(a => console.log('aaa', a))
  }

}
