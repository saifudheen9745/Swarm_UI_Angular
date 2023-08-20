import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {
  localStorageSyncReducer,
  userDetailsReducer,
} from './shared/ngrx/ngrx.reducers';
import { InterceptorService } from './shared/services/interceptor/interceptor.service';
import { NgxColorsModule } from 'ngx-colors';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { IsLoggedInService } from './shared/guards/is-logged-in.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(
      {
        userDetailsState: userDetailsReducer,
        // Add more state slices here
      },
      {
        // Provide the meta-reducers array
        metaReducers: [localStorageSyncReducer],
      }
    ),
    NgxColorsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 150,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AuthGuardService,
    IsLoggedInService
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
