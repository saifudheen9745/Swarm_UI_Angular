import { Injectable } from '@angular/core';
import { UserAccountComponent } from './user-account.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { loginResponseData, userAccountDetails } from 'src/app/config/config.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient) { }

  getUserDetails = (userId:string):Observable<userAccountDetails>=>{
    return this.http.get<userAccountDetails>(`${environment.baseUrl}/getuser/${userId}`)
  }

  editUserDetails = (userDetails:userAccountDetails)=>{
    return this.http.post<userAccountDetails>(`${environment.baseUrl}/edituser`,{userDetails})
  }
}
