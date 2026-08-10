import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  /** IDs currently playing the exit animation; removed from list after animation ends. */
  exitingToastIds = signal<ReadonlySet<string>>(new Set());

  /**
   * Show a success toast
   */
  success(title: string, message?: string, options?: Partial<ToastMessage>): string {
    return this.add({
      variant: 'success',
      title,
      message: message || '',
      duration: options?.duration || 5000,
      sticky: options?.sticky || false,
      ...options,
    });
  }

  /**
   * Show an info toast
   */
  info(title: string, message?: string, options?: Partial<ToastMessage>): string {
    return this.add({
      variant: 'info',
      title,
      message: message || '',
      duration: options?.duration || 5000,
      sticky: options?.sticky || false,
      ...options,
    });
  }

  /**
   * Show a warning toast
   */
  warn(title: string, message?: string, options?: Partial<ToastMessage>): string {
    return this.add({
      variant: 'warning',
      title,
      message: message || '',
      duration: options?.duration || 5000,
      sticky: options?.sticky || false,
      ...options,
    });
  }

  /**
   * Show an error toast
   */
  error(title: string, message?: string, options?: Partial<ToastMessage>): string {
    return this.add({
      variant: 'danger',
      title,
      message: message || '',
      duration: options?.duration || 5000,
      sticky: options?.sticky || false,
      ...options,
    });
  }

  /**
   * Add a custom toast
   */
  add(toast: ToastMessage): string {
    const toastWithId = {
      ...toast,
      id: toast.id || this.generateId(),
    };

    this.toasts.update(list => [toastWithId, ...list]);
    if (toast.duration && !toast.sticky) {
      setTimeout(() => {
        this.beginExit(toastWithId.id!);
      }, toast.duration);
    }

    return toastWithId.id!;
  }

  /**
   * Start exit animation; DOM removal happens after `finishExit` (called from toast animation end).
   */
  beginExit(id: string): void {
    if (!this.toasts().some(t => t.id === id)) {
      return;
    }
    this.exitingToastIds.update(ids => new Set(ids).add(id));
  }

  finishExit(id: string): void {
    if (!this.toasts().some(t => t.id === id)) {
      return;
    }
    this.toasts.update(list => list.filter(t => t.id !== id));
    this.exitingToastIds.update(ids => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  }

  /**
   * Remove a specific toast by ID (immediate, no animation)
   */
  remove(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
    this.exitingToastIds.update(ids => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  }

  /**
   * Remove a specific toast by object
   */
  removeToast(toast: ToastMessage): void {
    if (toast.id) {
      this.remove(toast.id);
    }
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts.set([]);
    this.exitingToastIds.set(new Set());
  }

  /**
   * Get current toasts
   */
  getToasts(): ToastMessage[] {
    return this.toasts();
  }

  /**
   * Generate unique ID for toasts
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
