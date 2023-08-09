import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataFromGoogle,loginResponseData,userRegisterDetals } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupPageService {
  constructor(private api: HttpClient) {}

  doRegister = (SignupDetails: userRegisterDetals) => {
    return this.api.post(`${environment.baseUrl}/register`, SignupDetails);
  };

  doRegisterWithGoogle = (googleDetails: dataFromGoogle):Observable<loginResponseData> => {
    return this.api.post<loginResponseData>(
      `${environment.baseUrl}/googleregister`,
      googleDetails
    );
  };
}
