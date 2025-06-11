import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../seed-work/api.service';
import { ResultResponse } from '../seed-work/result-response.model';
// import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/auth.model';
import { TokenStorage } from '../common/token-validity';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly endpoint = 'auth';

  constructor(private apiService: ApiService) {}

  login(request: LoginRequest): Observable<ResultResponse<string>> {
    return this.apiService.post<string>(`${this.endpoint}/login`, request);
  }

  updateUserActivity(isActive: boolean): Observable<any> {
    const token = TokenStorage.getToken();
    if (!token) throw new Error('No token found');

    const decoded = TokenStorage.decodeToken(token);
    const username =
      decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    if (!username) throw new Error('No username found in token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.apiService.post<any>(
      `${this.endpoint}/update-activity`,
      { username, isActive },
      headers
    );
  }

  refreshToken(): Observable<ResultResponse<string>> {
    const token = TokenStorage.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.apiService
      .post<string>(
        `${this.endpoint}/refresh-token`,
        {}, // backend không cần body theo bạn nói
        headers
      )
      .pipe(
        tap((res) => {
          if (res.Success && res.Data) {
            TokenStorage.saveToken(res.Data); // lưu token mới
          }
        })
      );
  }

  getCurrentUsername(): string | null {
    const token = TokenStorage.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.unique_name || decoded.username || decoded.sub || null;
    } catch {
      return null;
    }
  }
}
