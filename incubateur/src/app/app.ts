import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
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

  private routerSubscription: Subscription;
  private revealObserver?: IntersectionObserver;
  private domObserver?: MutationObserver;
  private revealFrame?: number;
  private revealTimer?: number;
  private reducedMotion = false;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Masquer le footer sur la page dashboard
        this.showFooter = !event.url.includes('/dashboard');
        this.scheduleRevealRefresh();
      }
    });
  }

  ngOnInit() {
    if (typeof window === 'undefined') return;
    this.scheduleRevealRefresh();
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

    if (typeof window === 'undefined') return;
    if (this.revealFrame !== undefined) window.cancelAnimationFrame(this.revealFrame);
    if (this.revealTimer !== undefined) window.clearTimeout(this.revealTimer);
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
