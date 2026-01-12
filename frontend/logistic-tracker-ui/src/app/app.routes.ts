import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Auth } from './layout/auth/auth';
import { Register } from './pages/register/register';
import { Forgot } from './pages/forgot/forgot';
import { ResetPassword } from './pages/reset-password/reset-password';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forgot', component: Forgot },
      { path: 'reset-password', component: ResetPassword },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  // TBD Add auth guard here later
  {
    path: 'dashboard',
    component: Dashboard,
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
