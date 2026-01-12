export interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  exists: boolean;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
