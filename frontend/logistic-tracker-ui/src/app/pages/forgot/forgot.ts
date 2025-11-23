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

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      this.showSuccess = true;

      // later this will call backend:
      // this.authService.forgotPassword(this.forgotForm.value.email)

      // Add Show Reset Password Logic Here after a delay of 5 seconds
      setTimeout(() => {
        this.showResetPassword = true;
      }, 5000);
    }
  }

  onResetPassword() {
    this.router.navigate(['/auth/reset-password']);
  }
}
