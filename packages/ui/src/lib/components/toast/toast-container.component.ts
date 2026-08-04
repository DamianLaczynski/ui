import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';

import { ToastComponent } from './toast.component';
import { ToastMessage, ToastPosition } from './models/toast.model';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'ui-toast-container',

  imports: [ToastComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div [class]="containerClasses()">
      @for (toast of toasts(); track toast.id) {
        <ui-toast
          [toastId]="toast.id"
          [title]="toast.title"
          [message]="toast.message"
          [variant]="toast.variant || 'info'"
          [appearance]="toast.appearance || 'filled'"
          [size]="toast.size || 'medium'"
          [showIcon]="toast.showIcon !== false"
          [dismissible]="toast.dismissible !== false"
          [showProgress]="toast.showProgress !== false"
          [duration]="toast.duration || 5000"
          [stackFrom]="stackFrom()"
          [isExiting]="isExiting(toast.id)"
          (dismiss)="onToastDismiss(toast)"
          (exitAnimationComplete)="onExitAnimationComplete($event)"
        >
          @if (toast.contentTemplate) {
            <ng-container [ngTemplateOutlet]="toast.contentTemplate" />
          }
        </ui-toast>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);

  toasts = this.toastService.toasts;
  position = input<ToastPosition>('top-right');

  stackFrom = computed<'top' | 'bottom'>(() =>
    this.position().startsWith('top') ? 'top' : 'bottom',
  );

  containerClasses(): string {
    const p = this.position();
    const base = `toast-container toast-container--${p}`;
    return p.startsWith('bottom')
      ? `${base} toast-container--stack-from-bottom`
      : `${base} toast-container--stack-from-top`;
  }

  isExiting(id: string | undefined): boolean {
    return !!id && this.toastService.exitingToastIds().has(id);
  }

  onToastDismiss(toast: ToastMessage): void {
    this.toastService.beginExit(toast.id!);
  }

  onExitAnimationComplete(id: string): void {
    this.toastService.finishExit(id);
  }
}
