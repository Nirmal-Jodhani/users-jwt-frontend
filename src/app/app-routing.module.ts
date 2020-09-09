import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-edit/:id', component: RegisterComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
