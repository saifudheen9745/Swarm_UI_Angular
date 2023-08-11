import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { loginResponseData } from 'src/app/config/config.types';
import { setUserDetails } from '../../ngrx/ngrx.actions';

const excludedUrl: string[] = [
  '',
  '/googlelogin',
  '/register',
  '/googleregister',
];

interface AppStore {
  userDetailsState: loginResponseData;
}

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  accessToken: string;

  constructor(private store: Store, private http: HttpClient) {
    this.store
      .select((state: any) => state?.userDetailsState)
      .subscribe((data: any) => {
        console.log(data);
        this.accessToken = data.accessToken;
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    
    // Intercept the request before it is sent
    let modifiedReq: HttpRequest<any> = req;
    const url = req.url.split(environment.baseUrl)[1];
    modifiedReq = req.clone({ withCredentials: true });
    if (!excludedUrl.includes(url)) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    }
    
    return next.handle(modifiedReq).pipe(
      tap(
        (event) => {
          // Intercept the response (status 2xx)
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {
          // Intercept errors
          if (error instanceof HttpErrorResponse) {
            console.error('Error occurred:');
          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        // Intercept the response error
        if (error.status === 403) {
          

          // Request a new token when receiving a 403 response
          return this.requestNewAccessToken().pipe(
            mergeMap((newToken:any) => {
              console.log('NewToken', newToken);
              this.store.dispatch(setUserDetails({
                accessToken:newToken.accessToken,
                userId:'',
                name:'',
                email:''
              }))
              // Retry the original request with the new access token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken.accessToken}`,
                },
              });
              return next.handle(retryReq);
            }),
            catchError((newTokenError) => {
              console.error('Error refreshing access token:', newTokenError);
              // Return the original error if token refresh fails
              return throwError(error);
            })
          );
        } else {
          // Pass through the error if it's not a 403 response
          return throwError(error);
        }
      })
    );
  }

  requestNewAccessToken(): Observable<string> {
    return this.http.get<string>(`${environment.baseUrl}/token`);
  }
}
