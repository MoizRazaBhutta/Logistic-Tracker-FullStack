import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [MatButton, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout() {
    console.log(this.authService.isLoggedIn());
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    console.log(this.authService.isLoggedIn());
  }
}
