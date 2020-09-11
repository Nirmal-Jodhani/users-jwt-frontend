// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTES
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

// GUARDS FOR AUTHENTICATION AND AUTHRIZATION
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';


const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-edit/:id', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'employee-register', component: EmployeeRegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
