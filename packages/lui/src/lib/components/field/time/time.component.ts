import {
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import {
  TimePickerComponent,
  formatHhmmForDisplay,
  parseFlexibleTimeToHhmm,
} from '../../time-picker';
import {
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
  OverlayHandle,
  openConnectedOverlay,
} from '../../overlay/open-connected-overlay';
import { Subscription } from 'rxjs';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

@Component({
  selector: 'ui-time',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    TimePickerComponent,
  ],
  templateUrl: './time.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TimeComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private breakpointObserver = inject(BreakpointObserver);
  private overlayHandle: OverlayHandle | null = null;

  step = input<number | string>('');
  panelWidth = input<number>(220);
  use24HourFormat = input<boolean>(true);
  useNativeOnMobile = input<boolean>(true);

  isOpen = signal<boolean>(false);
  isMobile = signal(false);
  selectedTime = signal<string>('');
  private breakpointSub?: Subscription;
  displayText = computed(() => formatHhmmForDisplay(this.selectedTime(), this.use24HourFormat()));

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<unknown>;

  constructor() {
    super();

    this.breakpointSub = this.breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
      this.isMobile.set(result.matches);
    });

    effect(() => {
      const time = this.selectedTime();
      this.value = time;
      this.onChange(this.value);
    });
  }

  ngOnDestroy(): void {
    this.breakpointSub?.unsubscribe();
    this.overlayHandle?.destroy();
  }

  togglePanel(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (this.isOpen()) {
      this.closePanel(false);
    } else {
      this.openPanel();
    }
  }

  closePanel(shouldFocusTrigger: boolean = false): void {
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);

    if (
      shouldFocusTrigger &&
      this.triggerElement?.nativeElement &&
      document.contains(this.triggerElement.nativeElement)
    ) {
      try {
        setTimeout(() => this.triggerElement.nativeElement.focus({ preventScroll: true }), 0);
      } catch {
        // no-op
      }
    }
  }

  onTimeInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      return;
    }

    const normalized = parseFlexibleTimeToHhmm(inputValue);
    if (normalized) {
      this.selectedTime.set(normalized);
    }
  }

  onNativeTimeChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    this.selectedTime.set(inputValue);
    this.onChange(inputValue);
  }

  onTimeChange(timeStr: string): void {
    this.selectedTime.set(timeStr);
  }

  override writeValue(value: unknown): void {
    if (!value) {
      this.selectedTime.set('');
      super.writeValue('');
      return;
    }

    this.selectedTime.set(String(value));
    super.writeValue(value);
  }

  override clear(): void {
    this.selectedTime.set('');
    super.clear();
  }

  getNativeTimeStep(): string {
    const s = this.step();
    if (s === '' || s === undefined) return '60';
    return String(typeof s === 'number' ? s : parseInt(String(s), 10) || 60);
  }

  openPanel(): void {
    if (this.isOpen()) {
      return;
    }

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: this.triggerElement,
      template: this.panelTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions: DEFAULT_CONNECTED_POSITIONS,
        viewportMargin: DEFAULT_VIEWPORT_MARGIN,
        width: this.panelWidth(),
        hasBackdrop: false,
      },
      onClose: focusTrigger => {
        if (focusTrigger) {
          this.closePanel(true);
        } else {
          setTimeout(() => this.closePanel(false), 0);
        }
      },
    });

    this.isOpen.set(true);
  }
}
