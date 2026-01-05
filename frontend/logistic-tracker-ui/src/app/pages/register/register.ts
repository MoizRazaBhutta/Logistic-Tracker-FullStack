import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { RegisterUser } from '../../models/user.interface';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  router: Router = inject(Router);
  authService = inject(AuthService);
  registerForm: FormGroup = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [this.passwordMatchValidator.bind(this)] }
  );

  passwordMatchValidator(
    control: AbstractControl<any, any, any>
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value === confirmPassword?.value) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
  onRegister() {
    if (this.registerForm.valid) {
      console.log('User:', this.registerForm.value);
      // Navigate or send to backend
      const userData: RegisterUser = {
        fullName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.authService.register(userData).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          // optional: navigate to login
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        },
      });
    }
  }
}
