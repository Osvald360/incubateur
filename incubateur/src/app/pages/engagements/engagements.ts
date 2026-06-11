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

  private observer?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
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
    this.observer?.disconnect();
  }
}
