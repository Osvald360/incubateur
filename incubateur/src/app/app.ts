import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { NotificationComponent } from './components/notification/notification';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NotificationComponent, MatToolbarModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  protected title = 'incubateur';
  showFooter = true;
  isLoaded = false;
  scrollProgress = 0;

  private routerSubscription: Subscription;
  private revealObserver?: IntersectionObserver;
  private domObserver?: MutationObserver;
  private revealFrame?: number;
  private revealTimer?: number;
  private reducedMotion = false;

  private onScroll = () => {
    const d = document.documentElement;
    const progress = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
    this.scrollProgress = isNaN(progress) ? 0 : progress;
    this.cdr.detectChanges();
  };

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Masquer le footer sur la page dashboard
        this.showFooter = !event.url.includes('/dashboard');
        this.cdr.detectChanges();
        this.scheduleRevealRefresh();
      }
    });
  }

  ngOnInit() {
    if (typeof window === 'undefined') return;
    this.scheduleRevealRefresh();
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // Simulate loader
    setTimeout(() => {
      this.isLoaded = true;
      this.cdr.detectChanges();
    }, 1800);
  }

  ngAfterViewInit() {
    if (typeof document === 'undefined') return;
    const root = document.querySelector<HTMLElement>('.main-content');
    if (!root) return;

    // Observe child nodes added by the router to hook up animations dynamically
    this.domObserver = new MutationObserver(mutations => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0);
      if (hasAddedNodes) {
        this.scheduleRevealRefresh();
      }
    });
    this.domObserver.observe(root, { childList: true, subtree: true });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.revealObserver?.disconnect();
    this.domObserver?.disconnect();

    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
      if (this.revealFrame !== undefined) window.cancelAnimationFrame(this.revealFrame);
      if (this.revealTimer !== undefined) window.clearTimeout(this.revealTimer);
    }
  }

  private scheduleRevealRefresh(): void {
    if (typeof window === 'undefined') return;

    if (this.revealFrame !== undefined) window.cancelAnimationFrame(this.revealFrame);
    if (this.revealTimer !== undefined) window.clearTimeout(this.revealTimer);

    this.revealFrame = window.requestAnimationFrame(() => {
      this.revealFrame = undefined;
      this.revealTimer = window.setTimeout(() => {
        this.revealTimer = undefined;
        this.setupScrollReveals();
      }, 80);
    });
  }

  private setupScrollReveals(): void {
    if (typeof document === 'undefined') return;
    const root = document.querySelector<HTMLElement>('.main-content');
    if (!root) return;

    const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window;

    if (!this.revealObserver && canObserve) {
      this.revealObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            if (target.classList.contains('scroll-reveal-step')) {
              target.classList.add('is-lit');
            } else {
              this.revealBlock(target);
            }
            this.revealObserver?.unobserve(target);
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0 }
      );
    }

    const revealBlocks = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const stepNodes = Array.from(root.querySelectorAll<HTMLElement>('.step-node'));

    revealBlocks.forEach(block => {
      if (!block.classList.contains('scroll-reveal-ready')) {
        block.classList.add('scroll-reveal-ready');
        this.prepareRevealBlock(block, !canObserve);
        if (canObserve) this.revealObserver?.observe(block);
      }
    });

    stepNodes.forEach(node => {
      if (!node.classList.contains('scroll-reveal-ready')) {
        node.classList.add('scroll-reveal-ready', 'scroll-reveal-step');
        if (!canObserve) node.classList.add('is-lit');
        if (canObserve) this.revealObserver?.observe(node);
      }
    });

    this.setupMagneticButtons(root);
    this.setupGlassCards(root);
  }

  private setupMagneticButtons(root: HTMLElement): void {
    const magneticElements = Array.from(root.querySelectorAll<HTMLElement>('[data-magnetic]'));
    
    magneticElements.forEach(el => {
      if (el.classList.contains('magnetic-ready')) return;
      el.classList.add('magnetic-ready');

      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  private setupGlassCards(root: HTMLElement): void {
    const glassCards = Array.from(root.querySelectorAll<HTMLElement>('.ei-glass-card'));

    glassCards.forEach(card => {
      if (card.classList.contains('glass-ready')) return;
      card.classList.add('glass-ready');

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  private prepareRevealBlock(block: HTMLElement, revealNow: boolean): void {
    const children = Array.from(block.querySelectorAll<HTMLElement>('[data-reveal-child]'));
    const targets = children.length ? children : [block];

    block.classList.add('scroll-reveal');
    if (revealNow) block.classList.add('is-revealed');

    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal-item');
      target.style.setProperty('--reveal-delay', `${Math.min(index * 90, 540)}ms`);
      if (revealNow) target.classList.add('is-revealed');
    });
  }

  private revealBlock(block: HTMLElement): void {
    const children = Array.from(block.querySelectorAll<HTMLElement>('[data-reveal-child]'));
    const targets = children.length ? children : [block];

    block.classList.add('is-revealed');
    targets.forEach(target => target.classList.add('is-revealed'));
  }
}
