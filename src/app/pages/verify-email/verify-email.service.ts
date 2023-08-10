import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginResponsePostConfirmation } from 'src/app/config/config.types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailService {
  constructor(private api: HttpClient) {}

  confirmVerifyLink = (
    id: string,
    token: string
  ): Observable<loginResponsePostConfirmation> => {
    return this.api.post<loginResponsePostConfirmation>(
      `${environment.baseUrl}/confirmation`,
      { id, token }
    );
  };

  deleteAUser = (id: string): Observable<any> => {
    return this.api.get<any>(`${environment.baseUrl}/deleteUser/${id}`);
  };
}
