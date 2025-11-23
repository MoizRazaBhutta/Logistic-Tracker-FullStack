import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Auth } from './layout/auth/auth';

export const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: Login },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
