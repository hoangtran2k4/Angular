import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import {
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbButtonModule,
  NbIconModule,
  NbMenuItem,
  NbSidebarService,
  NbMediaBreakpointsService,
  NbThemeService,
  NbActionsModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { TokenStorage } from '../shared/common/token-validity';
import { AuthHandlerService } from '../auth/auth-handler';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UserActivityService } from '../shared/services/user-activity.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
  ],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit, OnDestroy {
  isMobile = false;
  sidebarState: 'expanded' | 'compacted' | 'collapsed' = 'compacted';

  menuItems: NbMenuItem[] = [
    {
      title: 'Customer',
      icon: 'home-outline',
      link: '/pages', 
      children: [
        {
          title: 'Danh sách khách hàng',
          link: '/pages/customer',
        },
        {
          title: 'Thêm khách hàng',
          link: '/pages/home',
        },
      ],
    },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService,
    private authHandler: AuthHandlerService,
    private router: Router,
    private userActivityService: UserActivityService
  ) {
    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange().subscribe(([_, newValue]) => {
      this.isMobile = newValue.width < breakpoints['md'];
      if (this.isMobile) {
        this.sidebarState = 'collapsed';
        this.sidebarService.collapse('menu-sidebar');
      } else {
        this.sidebarState = 'compacted';
        this.sidebarService.expand('menu-sidebar');
      }
    });
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarService.toggle(false, 'menu-sidebar');
    } else {
      if (this.sidebarState === 'compacted') {
        this.sidebarState = 'expanded';
        this.sidebarService.expand('menu-sidebar');
      } else {
        this.sidebarState = 'compacted';
        this.sidebarService.collapse('menu-sidebar');
      }
    }
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.sidebarService.toggle(false, 'menu-sidebar');
    }
  }

  logout(): void {
    TokenStorage.removeToken();
    window.location.href = '/login';
  }
  ngOnInit(): void {
    this.authHandler.initAuthHandler();
    this.userActivityService.startTracking();
  }

  ngOnDestroy(): void {
    this.authHandler.ngOnDestroy();
    this.userActivityService.stopTracking();
  }
}
