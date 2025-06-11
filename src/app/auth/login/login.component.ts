import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginRequest } from '../../shared/models/auth.model';
import { TokenStorage } from '../../shared/common/token-validity';
import { UserActivityService } from '../../shared/services/user-activity.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userActivityService: UserActivityService //inject
  ) {}

 onLogin(): void {
  const loginData: LoginRequest = {
    username: this.username,
    password: this.password,
  };

  this.authService.login(loginData).subscribe({
    next: (res) => {
      if (res.Success && res.Data) {
        TokenStorage.saveToken(res.Data);
        this.router.navigate(['/pages'], { replaceUrl: true });
        this.userActivityService.startTracking(); // bắt đầu cập nhật định kỳ
      } else {
        alert('Đăng nhập thất bại');
        this.errorMessage =
          'Đăng nhập thất bại: ' + (res.message ?? 'Không rõ lý do');
      }
    },
    error: (err) => {
      if (err.status === 401) {
        // Lỗi đăng nhập sai username/password
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        alert(this.errorMessage);
      } else {
        this.errorMessage = 'Lỗi hệ thống: ' + err.message;
        alert(this.errorMessage);
      }
    },
  });
}

}
