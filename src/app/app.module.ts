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
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedComponentsModule } from './shared/components/shared-components.module';

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
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
