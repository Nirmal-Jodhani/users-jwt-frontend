// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// EXTERNAL LIBRARY
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon'; 

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// SERVICE
import { AuthenticationService } from './authentication.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

// INTERCEPTOR AND INTIALIZOR
import {appInitializer} from './shared/app.initializer';
import {JwtInterceptor} from './shared/jwt.interceptor';
import {ErrorInterceptor} from './shared/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
