import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ToastContainerComponent, ToastService } from 'lui';

@Component({
  selector: 'app-toast-service-example',
  standalone: true,
  imports: [ButtonComponent, ToastContainerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" (click)="pushPrimary()">Primary</ui-button>
        <ui-button type="button" variant="secondary" (click)="pushSecondary()">Secondary</ui-button>
        <ui-button type="button" variant="info" (click)="pushInfo()">Info</ui-button>
        <ui-button type="button" variant="success" (click)="pushSuccess()">Success</ui-button>
        <ui-button type="button" variant="warning" (click)="pushWarn()">Warning</ui-button>
        <ui-button type="button" variant="danger" (click)="pushError()">Error</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="clearAll()"
          >Reset</ui-button
        >
      </div>
    </div>
    <ui-toast-container position="top-right" />
  `,
})
export class ToastServiceExampleComponent {
  private readonly toast = inject(ToastService);

  pushPrimary(): void {
    this.toast.add({
      variant: 'primary',
      appearance: 'filled',
      title: 'Primary',
      message: 'Queued with variant primary.',
      duration: 5000,
    });
  }

  pushSecondary(): void {
    this.toast.add({
      variant: 'secondary',
      appearance: 'filled',
      title: 'Secondary',
      message: 'Queued with variant secondary.',
      duration: 5000,
    });
  }

  pushInfo(): void {
    this.toast.info('Information', 'Queued from ToastService.info().');
  }

  pushSuccess(): void {
    this.toast.success('Success', 'Queued from ToastService.success().');
  }

  pushWarn(): void {
    this.toast.warn('Warning', 'Queued from ToastService.warn().');
  }

  pushError(): void {
    this.toast.error('Error', 'Queued from ToastService.error().');
  }

  clearAll(): void {
    this.toast.clear();
  }
}
