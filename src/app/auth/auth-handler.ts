import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { UserActivityService } from '../shared/services/user-activity.service';
import { AuthService } from '../shared/services/auth.service';
import { TokenStorage } from '../shared/common/token-validity';

@Injectable({
  providedIn: 'root',
})
export class AuthHandlerService implements OnDestroy {
  private refreshIntervalId?: ReturnType<typeof setInterval>;
  private activitySub?: Subscription;
  private isOnline = false;

  constructor(
    private userActivityService: UserActivityService,
    private authService: AuthService,
    private router: Router
  ) {}

  initAuthHandler(): void {
    const token = TokenStorage.getToken();

    if (token && !this.isTokenExpired(token)) {
      this.userActivityService.startTracking();
      this.subscribeToActivity();
      this.scheduleTokenRefresh();
    } else {
      this.logout();
    }
  }

  private subscribeToActivity(): void {
    this.activitySub = this.userActivityService.userActivity$.subscribe(
      (active) => {
        this.isOnline = active;
      }
    );
  }

  private scheduleTokenRefresh(): void {
    this.refreshIntervalId = setInterval(() => {
      const token = TokenStorage.getToken();
      if (!token) return;

      const decoded: any = jwtDecode(token);
      const timeLeft = decoded.exp * 1000 - Date.now();

      if (timeLeft <= 0) {
        console.warn('Token đã hết hạn');
        this.logout();
      } else if (timeLeft < 60 * 1000) {
        if (this.isOnline) {
          this.authService.refreshToken().subscribe({
            next: (res) => {
              // console.log('Token được tự động gia hạn');
              TokenStorage.saveToken(res.Data);
            },
            error: (err) => {
              // console.warn('Không thể gia hạn token:', err);
              this.logout();
            },
          });
        } else {
          // console.log('Không gia hạn token vì user đang offline');
        }
      }
    }, 30 * 1000);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return Date.now() >= decoded.exp * 1000;
    } catch {
      return true;
    }
  }

  logout(): void {
    TokenStorage.clearToken();
    clearInterval(this.refreshIntervalId);
    this.activitySub?.unsubscribe();
    this.userActivityService.stopTracking();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshIntervalId);
    this.activitySub?.unsubscribe();
    this.userActivityService.stopTracking();
  }
}
