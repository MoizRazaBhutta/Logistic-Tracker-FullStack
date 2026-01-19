import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginResponse,
  LoginUser,
  RegisterUser,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';
  http = inject(HttpClient);

  register(payload: RegisterUser) {
    console.log('Base URL:', this.baseUrl);
    return this.http.post(`${this.baseUrl}/register`, payload);
  }
  login(payload: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  forgotPassword(
    payload: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.baseUrl}/forgot-password`,
      payload
    );
  }

  resetPassword(
    payload: ResetPasswordRequest
  ): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${this.baseUrl}/reset-password`,
      payload
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }
}
