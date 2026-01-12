import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoginResponse, LoginUser } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginErrorMessage: string | null = null;

  router: Router = inject(Router);
  authService = inject(AuthService);

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginErrorMessage = null; // Reset previous error message
    const userData: LoginUser = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService.login(userData).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful', response);
        // Store tokens in local storage
        this.authService.setAccessToken(response.token);
        this.authService.setRefreshToken(response.refreshToken);

        // Navigate to dashboard or home page
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        // 🔥 THIS IS THE IMPORTANT PART
        if (err.status === 401) {
          this.loginErrorMessage =
            err.error?.message || 'Invalid email or password';
        } else {
          this.loginErrorMessage =
            'Something went wrong. Please try again later.';
        }

        // optional: clear password field
        this.loginForm.controls.password.reset();
      },
    });
  }
}
