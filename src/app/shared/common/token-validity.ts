import { JwtHelperService } from '@auth0/angular-jwt';

export class TokenStorage {
  private static readonly TOKEN_KEY = 'access_token';

  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(token);
  }

  static decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  static clearToken(): void {
    localStorage.removeItem('access_token');
  }
}
