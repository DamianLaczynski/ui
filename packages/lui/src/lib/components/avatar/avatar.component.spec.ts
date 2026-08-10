/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose avatar semantics on host element', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Avatar');
  });

  it('should prefer explicit ariaLabel over name and fallback', () => {
    fixture.componentRef.setInput('name', 'Anna Kowalska');
    fixture.componentRef.setInput('ariaLabel', 'Profil uzytkownika');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('aria-label')).toBe('Profil uzytkownika');
  });

  it('should use name as aria-label when explicit ariaLabel is missing', () => {
    fixture.componentRef.setInput('name', 'Anna Kowalska');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('aria-label')).toBe('Anna Kowalska');
  });

  it('should render image with decorative alt when image is provided', () => {
    fixture.componentRef.setInput('image', '/assets/avatar.jpg');
    fixture.detectChanges();

    const image: HTMLImageElement | null = fixture.nativeElement.querySelector('.avatar__image');
    expect(image).toBeTruthy();
    expect(image?.getAttribute('alt')).toBe('');
  });

  it('should derive initials from full name', () => {
    fixture.componentRef.setInput('name', 'Jan Nowak');
    fixture.detectChanges();

    const initials: HTMLElement | null = fixture.nativeElement.querySelector('.avatar__initials');
    expect(initials?.textContent?.trim()).toBe('JN');
  });

  it('should show loading state and expose aria-busy', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const overlay: HTMLElement | null = fixture.nativeElement.querySelector(
      '.avatar__loading-overlay',
    );

    expect(host.getAttribute('aria-busy')).toBe('true');
    expect(overlay).toBeTruthy();
  });

  it('should expose aria-disabled when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('aria-disabled')).toBe('true');
  });
});
