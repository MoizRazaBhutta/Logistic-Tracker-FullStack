import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterUser } from '../models/user.interface';

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
}
