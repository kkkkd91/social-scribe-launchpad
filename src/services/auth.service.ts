import api from './api';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  code: string;
}

export interface ResetPasswordData {
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    onboardingStatus: 'incomplete' | 'completed';
    onboardingStep: number;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    this.setTokens(response.data.data.tokens);
    return response.data.data;
  }

  /**
   * Login with email and password
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    this.setTokens(response.data.data.tokens);
    return response.data.data;
  }

  /**
   * Get Google OAuth URL
   */
  getGoogleAuthUrl(): string {
    return `${api.defaults.baseURL}/auth/google`;
  }

  /**
   * Get LinkedIn OAuth URL
   */
  getLinkedInAuthUrl(): string {
    return `${api.defaults.baseURL}/auth/linkedin`;
  }

  /**
   * Handle OAuth callback
   */
  async handleOAuthCallback(token: string): Promise<AuthResponse> {
    const response = await api.post('/auth/oauth/callback', { token });
    this.setTokens(response.data.data.tokens);
    return response.data.data;
  }

  /**
   * Verify email with code
   */
  async verifyEmail(data: VerifyEmailData): Promise<{ user: AuthResponse['user'] }> {
    const response = await api.post('/auth/verify-email', data);
    return response.data.data;
  }

  /**
   * Resend verification code
   */
  async resendVerification(): Promise<{ message: string }> {
    const response = await api.post('/auth/resend-verification');
    return response.data;
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, data: ResetPasswordData): Promise<{ message: string }> {
    const response = await api.post(`/auth/reset-password/${token}`, data);
    return response.data;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<{ user: AuthResponse['user'] }> {
    const response = await api.get('/auth/me');
    return response.data.data;
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /**
   * Set auth tokens in localStorage
   */
  private setTokens(tokens: AuthResponse['tokens']): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

export default new AuthService(); 