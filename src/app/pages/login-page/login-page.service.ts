import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { loginResponseData } from 'src/app/config/config.types';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  constructor(private api: HttpClient) {}

  doLogin(email: string, password: string): Observable<loginResponseData> {
    return this.api.post<loginResponseData>(environment.baseUrl, {
      email,
      password,
    });
  }

  doGoogleLogin(email: string): Observable<loginResponseData> {
    return this.api.post<loginResponseData>(
      `${environment.baseUrl}/googlelogin`,
      { email }
    );
  }
}
