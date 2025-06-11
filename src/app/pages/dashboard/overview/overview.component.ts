import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../shared/common/token-validity';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(private router: Router) {}

  logout(): void {
    TokenStorage.removeToken();
    this.router.navigate(['/login']);
  }
}
