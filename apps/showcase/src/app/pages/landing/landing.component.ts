import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ThemeMode, ThemeService } from '@shared/theme/theme.service';
import { ThemeBuilderService } from '@shared/theme/theme-builder.service';
import { BadgeComponent, ButtonComponent, IconComponent, type Variant } from 'ui';
import { environment } from '@environments/environment';
import { LandingComponentSurfaceComponent } from './components/landing-component-surface/landing-component-surface.component';
import { ThemeDrawerComponent } from '../../layout/ds/components/theme-drawer/theme-drawer.component';
import { ALL_SHOWCASE_COMPONENTS, ShowcaseComponent } from './landing-showcase-components';

interface RoadmapPreviewItem {
  id: string;
  title: string;
  timeframe: string;
  summary: string;
  status: 'done' | 'active' | 'next';
}

@Component({
  selector: 'app-landing',
  imports: [
    BadgeComponent,
    ButtonComponent,
    IconComponent,
    RouterLink,
    LandingComponentSurfaceComponent,
    ThemeDrawerComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  private readonly themeService = inject(ThemeService);
  private readonly themeBuilder = inject(ThemeBuilderService);

  readonly themeDrawerOverlayLayout = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 768px)')
      .pipe(map(r => r.matches)),
    { initialValue: false },
  );

  readonly version = environment.libraryVersion;
  readonly currentYear = new Date().getFullYear();
  readonly githubUrl = 'https://github.com/DamianLaczynski/ui';
  readonly npmUrl = 'https://www.npmjs.com/';
  readonly roadmapPreview: RoadmapPreviewItem[] = [
    {
      id: 'stability',
      title: 'Core stability',
      timeframe: 'Q1 2026',
      summary: 'Foundation for theme tokens, docs structure and baseline accessibility.',
      status: 'done',
    },
    {
      id: 'dx',
      title: 'Developer experience',
      timeframe: 'Q2 2026',
      summary: 'Better guides, richer API examples and stronger test coverage.',
      status: 'active',
    },
    {
      id: 'advanced',
      title: 'Advanced components',
      timeframe: 'Q3 2026',
      summary: 'Data-heavy patterns and layout primitives for enterprise applications.',
      status: 'next',
    },
  ];

  readonly showcaseComponents = signal<ShowcaseComponent[]>(ALL_SHOWCASE_COMPONENTS);

  readonly showcaseComponentCount = computed(() => this.showcaseComponents().length);

  readonly router = inject(Router);

  isDarkMode = computed(() => this.themeService.$themeMode() === ThemeMode.Dark);
  themeLabel = computed(() => (this.isDarkMode() ? 'Light mode' : 'Dark mode'));
  themeIcon = computed(() => (this.isDarkMode() ? 'weather_sunny' : 'weather_moon'));
  themeBuilderAriaLabel = computed(() =>
    this.themeBuilder.drawerOpen() ? 'Close theme builder' : 'Open theme builder',
  );

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleThemeBuilder(): void {
    this.themeBuilder.toggleDrawer();
  }

  navigateToComponents(): void {
    this.router.navigate(['/docs']);
  }

  navigateToGettingStarted(): void {
    this.router.navigate(['/docs/getting-started']);
  }

  navigateToRoadmap(): void {
    this.router.navigate(['/docs/roadmap']);
  }

  getRoadmapStatusLabel(status: RoadmapPreviewItem['status']): string {
    const labels: Record<RoadmapPreviewItem['status'], string> = {
      done: 'Shipped',
      active: 'In Progress',
      next: 'Planned',
    };
    return labels[status];
  }

  roadmapBadgeVariant(status: RoadmapPreviewItem['status']): Variant {
    const variants: Record<RoadmapPreviewItem['status'], Variant> = {
      done: 'success',
      active: 'warning',
      next: 'primary',
    };
    return variants[status];
  }
}
