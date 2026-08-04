import {
  Component,
  inject,
  effect,
  ViewChild,
  ElementRef,
  computed,
  signal,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeBuilderService } from '@shared/theme/theme-builder.service';
import { ThemeService, ThemeVariant } from '@shared/theme/theme.service';
import { ColorComponent, SliderComponent, DrawerComponent, IconComponent } from 'ui';
import type { DrawerType, QuickAction } from 'ui';

@Component({
  selector: 'app-theme-drawer',
  standalone: true,
  imports: [FormsModule, ColorComponent, SliderComponent, DrawerComponent, IconComponent],
  templateUrl: './theme-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./theme-drawer.component.scss'],
})
export class ThemeDrawerComponent {
  readonly appearanceInDrawer = input<boolean>(false);
  readonly drawerType = input<DrawerType>('inline');
  readonly drawerSize = input<'small' | 'medium' | 'large'>('medium');
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  private themeBuilder = inject(ThemeBuilderService);
  readonly themeService = inject(ThemeService);

  readonly drawerVisible = signal(this.themeBuilder.drawerOpen());
  readonly themeMode = this.themeService.$themeMode;
  readonly themeVariants = this.themeService.themeVariants;
  readonly currentThemeVariant = computed(() => this.themeService.$themeVariant());
  readonly simpleState = this.themeBuilder.simpleState;

  additionalActions = computed<QuickAction[]>(() => [
    {
      label: 'Import',
      icon: 'arrow_upload',
      appearance: 'outline',
      action: () => this.triggerImport(),
    },
    {
      label: 'Export',
      icon: 'arrow_download',
      appearance: 'outline',
      action: () => this.exportTheme(),
    },
  ]);

  constructor() {
    effect(() => {
      const open = this.themeBuilder.drawerOpen();
      this.drawerVisible.set(open);
    });
    effect(() => {
      if (this.themeBuilder.drawerOpen()) {
        this.themeBuilder.applyLivePreview();
      } else {
        this.themeBuilder.clearLivePreview();
      }
    });
  }

  onDrawerClose(): void {
    this.themeBuilder.setDrawerOpen(false);
  }

  onBaseColorChange(value: string): void {
    this.themeBuilder.setSimpleState({ baseColor: value });
  }

  onHueTorsionChange(value: number): void {
    this.themeBuilder.setSimpleState({ hueTorsion: value });
  }

  onVibrancyChange(value: number): void {
    this.themeBuilder.setSimpleState({ vibrancy: value });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setThemeVariant(variant: ThemeVariant): void {
    this.themeService.setThemeVariant(variant);
  }

  exportTheme(): void {
    const scss = this.themeBuilder.exportScss();
    const blob = new Blob([scss], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.scss';
    a.click();
    URL.revokeObjectURL(url);
  }

  triggerImport(): void {
    this.fileInput?.nativeElement?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.themeBuilder.importScss(text);
    };
    reader.readAsText(file);
    input.value = '';
  }
}
