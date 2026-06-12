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
  private scrollHandler = () => {
    const el = document.documentElement;
    const scrolled = el.scrollTop || document.body.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    this.scrollProgress = total > 0 ? (scrolled / total) * 100 : 0;
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('scroll', this.scrollHandler, { passive: true });

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
    window.removeEventListener('scroll', this.scrollHandler);
    this.observer?.disconnect();
  }
}
