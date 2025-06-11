import { Injectable, NgZone } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  merge,
  Subscription,
  throttleTime,
  timer,
} from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorage } from '../common/token-validity';

@Injectable({ providedIn: 'root' })
export class UserActivityService {
  private activitySubscription?: Subscription;
  private idleTimerSubscription?: Subscription;
  private isActive = false;
  private firstActivityDetected = false;
  private readonly IDLE_TIME = 5 * 60 * 1000; // 5 phút

  public userActivity$ = new BehaviorSubject<boolean>(false); // Theo dõi global

  constructor(private authService: AuthService, private ngZone: NgZone) {}

  startTracking(): void {
    if (this.activitySubscription || !TokenStorage.getToken()) return;

    this.firstActivityDetected = false;
    this.setUserActiveState(true); // ← thêm dòng này
    this.resetIdleTimer();

    this.ngZone.runOutsideAngular(() => {
      const activityEvents$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll')
      );

      this.activitySubscription = activityEvents$.subscribe(() => {
        if (!this.firstActivityDetected) {
          //  Xử lý tương tác đầu tiên ngay lập tức
          this.firstActivityDetected = true;
          this.handleUserActivity();
          // Sau đó throttle để giới hạn cập nhật
          this.activitySubscription?.unsubscribe();
          this.activitySubscription = activityEvents$
            .pipe(throttleTime(15000))
            .subscribe(() => this.handleUserActivity());
        } else {
          // Nếu đã qua lần đầu → chỉ xử lý sau throttle
        }
      });

      this.resetIdleTimer();
    });
  }

  stopTracking(): void {
    this.activitySubscription?.unsubscribe();
    this.idleTimerSubscription?.unsubscribe();
    this.activitySubscription = undefined;
    this.idleTimerSubscription = undefined;
    this.setUserActiveState(false);
  }

  private handleUserActivity(): void {
    if (!this.isActive) {
      this.setUserActiveState(true);
    }
    this.resetIdleTimer();
  }

  private resetIdleTimer(): void {
    this.idleTimerSubscription?.unsubscribe();
    this.idleTimerSubscription = timer(this.IDLE_TIME).subscribe(() => {
      if (this.isActive) {
        this.setUserActiveState(false);
      }
    });
  }

  private setUserActiveState(isActive: boolean): void {
    this.isActive = isActive;
    this.userActivity$.next(isActive);
    this.authService.updateUserActivity(isActive).subscribe({
      error: (err) => console.warn('Lỗi cập nhật trạng thái user:', err),
    });
  }
}
