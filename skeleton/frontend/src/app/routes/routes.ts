import { RegisterComponent } from '../modules/auth/register/register.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { LoginComponent } from '../modules/auth/login/login.component';
import { AuthGuard } from '../modules/auth/auth.guard';
import { AuthedGuard } from '../modules/auth/authed.guard';
import { ProfileComponent } from '../modules/user/profile/profile.component';

export const ROUTES = [
  { path: 'auth/register', component: RegisterComponent, canActivate: [AuthedGuard] },
  { path: 'auth/login', component: LoginComponent, canActivate: [AuthedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users/profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
];
