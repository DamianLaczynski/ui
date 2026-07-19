import {
  Component,
  signal,
  inject,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  computed,
} from '@angular/core';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DsSidebarComponent } from './components/ds-sidebar/ds-sidebar.component';
import { ThemeDrawerComponent } from './components/theme-drawer/theme-drawer.component';
import { ButtonComponent, DrawerComponent } from 'ui';
import { ThemeBuilderService } from '@shared/theme/theme-builder.service';
import { IconComponent } from 'ui';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ScrollService } from '@shared/scroll/scroll.service';
import { Direction, DirectionService } from '@shared/direction/direction.service';
import { ThemeMode, ThemeService, ThemeVariant } from '@shared/theme/theme.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-ds',
  imports: [
    RouterOutlet,
    DsSidebarComponent,
    ThemeDrawerComponent,
    ButtonComponent,
    DrawerComponent,
    IconComponent,
  ],
  templateUrl: './ds.component.html',
})
export class DsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mainContent') mainContent?: ElementRef<HTMLElement>;
  @ViewChild('headerRef') headerRef?: ElementRef<HTMLElement>;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly scrollService = inject(ScrollService);
  private readonly directionService = inject(DirectionService);
  private readonly themeService = inject(ThemeService);
  readonly themeBuilder = inject(ThemeBuilderService);

  readonly version = environment.libraryVersion;
  readonly githubUrl = 'https://github.com/damianlaczynski/Ui';
  readonly npmUrl = 'https://www.npmjs.com/';

  isDarkMode = computed(() => this.themeService.$themeMode() === ThemeMode.Dark);
  themeLabel = computed(() => (this.isDarkMode() ? 'Light mode' : 'Dark mode'));
  themeIcon = computed(() => (this.isDarkMode() ? 'weather_sunny' : 'weather_moon'));
  readonly themeVariants = this.themeService.themeVariants;
  currentThemeVariant = computed(() => this.themeService.$themeVariant());
  currentThemeVariantLabel = computed(
    () =>
      this.themeVariants.find(variant => variant.id === this.currentThemeVariant())?.label ??
      'Theme',
  );
  private breakpointSubscription?: Subscription;

  private headerResizeObserver?: ResizeObserver;

  isSidebarOpen = signal<boolean>(true);
  isMobile = signal<boolean>(false);
  direction = this.directionService.$direction;

  ngAfterViewInit(): void {
    if (this.mainContent?.nativeElement) {
      this.scrollService.register(this.mainContent.nativeElement);
    }

    this.syncHeaderHeight();

    if (typeof ResizeObserver !== 'undefined' && this.headerRef?.nativeElement) {
      this.headerResizeObserver = new ResizeObserver(() => this.syncHeaderHeight());
      this.headerResizeObserver.observe(this.headerRef.nativeElement);
    }
  }

  private navSubscription?: Subscription;

  private readonly mobileBreakpoint = '(max-width: 1279.98px)';

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe(this.mobileBreakpoint)
      .subscribe(result => {
        this.isMobile.set(result.matches);
        if (result.matches) {
          this.isSidebarOpen.set(false);
        } else {
          this.isSidebarOpen.set(true);
        }
        this.syncHeaderHeight();
      });

    this.navSubscription = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile()) {
          this.closeSidebar();
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
    this.navSubscription?.unsubscribe();
    this.headerResizeObserver?.disconnect();
    this.scrollService.unregister();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setThemeVariant(variant: ThemeVariant): void {
    this.themeService.setThemeVariant(variant);
  }

  setDirection(direction: Direction): void {
    this.directionService.setDirection(direction);
  }

  private syncHeaderHeight(): void {
    const headerEl = this.headerRef?.nativeElement;
    if (!headerEl) return;

    const height = Math.ceil(headerEl.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--ds-header-height', `${height}px`);
  }
}
