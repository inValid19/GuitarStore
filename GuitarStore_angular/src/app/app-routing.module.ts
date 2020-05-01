import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { GuitarsComponent } from './admin/guitars/guitars.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './service/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: 'admin/users', component: UsersComponent, canActivate:[AuthGaurdService] },
  { path: 'admin/guitars', component: GuitarsComponent, canActivate:[AuthGaurdService] },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
