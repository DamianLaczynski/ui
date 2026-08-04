import { Component, inject, TemplateRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ToastService } from 'ui';

@Component({
  selector: 'app-toast-actions-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem">
      <ng-template #invite>
        <div
          style="margin-top:0.35rem;display:flex;flex-direction:column;gap:0.35rem;font-size:0.8125rem;line-height:1.45;color:inherit"
        >
          <span style="font-weight:600;opacity:0.95">Conference room B · Building 2</span>
          <span style="opacity:0.85"
            >Teams link was copied—paste into chat if guests join late.</span
          >
        </div>
        <div style="display:flex;gap:0.5rem">
          <ui-button slot="actions" type="button" variant="primary" appearance="outline">
            Accept
          </ui-button>
          <ui-button slot="actions" type="button" variant="secondary" appearance="outline">
            Propose new time
          </ui-button>
        </div>
      </ng-template>

      <ng-template #quota>
        <div
          style="margin-top:0.4rem;padding:0.5rem 0.65rem;border-radius:6px;background:color-mix(in srgb, currentColor 8%, transparent);font-size:0.8125rem;line-height:1.5"
        >
          <div style="display:flex;justify-content:space-between;gap:0.75rem;margin-bottom:0.35rem">
            <span style="opacity:0.9">Projects / Media</span>
            <span style="font-weight:600">9.2 GB / 10 GB</span>
          </div>
          <div
            style="height:6px;border-radius:999px;background:color-mix(in srgb, currentColor 18%, transparent);overflow:hidden"
          >
            <div
              style="height:100%;width:92%;border-radius:inherit;background:currentColor;opacity:0.65"
            ></div>
          </div>
        </div>
        <div style="display:flex;gap:0.5rem">
          <ui-button slot="actions" type="button" variant="warning" appearance="tint">
            Manage storage
          </ui-button>
        </div>
      </ng-template>

      <ng-template #payment>
        <div style="margin-top:0.35rem;font-size:0.8125rem;line-height:1.45;opacity:0.9">
          <span
            style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:0.75rem;opacity:0.85"
            >card_···4196 · declined (insufficient funds)</span
          >
        </div>
        <div style="display:flex;gap:0.5rem">
          <ui-button slot="actions" type="button" variant="danger" appearance="outline">
            Retry payment
          </ui-button>
          <ui-button slot="actions" type="button" variant="secondary" appearance="outline">
            Update card
          </ui-button>
        </div>
      </ng-template>

      <ng-template #backup>
        <div
          style="display:flex;flex-direction:column;gap:0.35rem;font-size:0.8125rem;line-height:1.5"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
            <span style="font-weight:600">12 files</span>
            <span style="opacity:0.9">2 duplicates skipped</span>
          </div>
          <span style="opacity:0.8;font-size:0.75rem">Full report in Activity → Backup.</span>
        </div>
      </ng-template>
      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
        <ui-button type="button" variant="info" (click)="pushInvite()">Meeting invite</ui-button>
        <ui-button type="button" variant="warning" (click)="pushQuota()">Storage warning</ui-button>
        <ui-button type="button" variant="danger" (click)="pushPayment()">Payment failed</ui-button>
        <ui-button type="button" variant="success" (click)="pushBackup()">Backup summary</ui-button>
      </div>
    </div>
  `,
})
export class ToastActionsExampleComponent {
  private readonly inviteTpl = viewChild.required<TemplateRef<unknown>>('invite');
  private readonly quotaTpl = viewChild.required<TemplateRef<unknown>>('quota');
  private readonly paymentTpl = viewChild.required<TemplateRef<unknown>>('payment');
  private readonly backupTpl = viewChild.required<TemplateRef<unknown>>('backup');
  private readonly toast = inject(ToastService);

  pushInvite(): void {
    this.toast.add({
      title: 'Meeting invite · Product sync',
      message: 'Alex Chen invited you for tomorrow 10:00–10:45.',
      variant: 'info',
      appearance: 'filled',
      contentTemplate: this.inviteTpl(),
      duration: 12000,
    });
  }

  pushQuota(): void {
    this.toast.add({
      title: 'Storage almost full',
      message: 'Uploads will pause soon unless you free space or upgrade.',
      variant: 'warning',
      appearance: 'filled',
      contentTemplate: this.quotaTpl(),
      duration: 15000,
    });
  }

  pushPayment(): void {
    this.toast.add({
      title: 'Payment could not be processed',
      message: 'Your subscription renewal failed. No charges were made.',
      variant: 'danger',
      appearance: 'filled',
      contentTemplate: this.paymentTpl(),
      duration: 12000,
      showProgress: false,
    });
  }

  pushBackup(): void {
    this.toast.add({
      title: 'Backup finished',
      message: '',
      variant: 'success',
      appearance: 'filled',
      contentTemplate: this.backupTpl(),
      duration: 9000,
    });
  }

  reset(): void {
    this.toast.clear();
  }
}
