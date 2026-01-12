import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '../../models/user.interface';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './forgot.html',
  styleUrl: './forgot.scss',
})
export class Forgot {
  showSuccess = false;
  showResetPassword = false;
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  forgotErrorMessage: string | null = null;

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.forgotErrorMessage = null;
    this.showSuccess = false;

    const payload = {
      email: this.forgotForm.value.email as string,
    };

    this.authService.forgotPassword(payload).subscribe({
      next: (res: ForgotPasswordResponse) => {
        this.showSuccess = true;

        if (!res.exists) {
          // optional: still show generic success for security
          console.warn('Email does not exist');
        }

        // optional delay for better user experience
        setTimeout(() => {
          this.showResetPassword = true;
        }, 3000);
      },
      error: () => {
        this.forgotErrorMessage =
          'Something went wrong. Please try again later.';
      },
    });
  }

  onResetPassword() {
    this.router.navigate(['/auth/reset-password']);
  }
}
