import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../models/user.interface';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  router: Router = inject(Router);
  resetSuccessMessage: string | null = null;
  resetErrorMessage: string | null = null;
  authService = inject(AuthService);
  resetForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [ResetPassword.passwordMatchValidator] }
  );

  static passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  onReset() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.resetErrorMessage = null;
    this.resetSuccessMessage = null;

    const payload: ResetPasswordRequest = {
      email: this.resetForm.value.email as string,
      newPassword: this.resetForm.value.password as string,
    };

    this.authService.resetPassword(payload).subscribe({
      next: (res: ResetPasswordResponse) => {
        this.resetSuccessMessage = res.message;

        // optional redirect to login
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        this.resetErrorMessage =
          err.error?.message || 'Failed to reset password';
      },
    });
  }
}
