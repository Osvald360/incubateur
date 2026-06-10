import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-engagements',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './engagements.html',
  styleUrls: ['./engagements.scss']
})
export class EngagementsComponent implements OnInit, OnDestroy {
  scrollProgress = 0;

  private observer?: IntersectionObserver;
  private onScroll = () => {
    const d = document.documentElement;
    this.scrollProgress = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.classList.add('page-light');
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          this.observer!.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => this.observer!.observe(el));
    }, 150);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('page-light');
    }
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
  }
}
