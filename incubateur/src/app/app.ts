
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { NotificationComponent } from './components/notification/notification';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NotificationComponent, MatToolbarModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected title = 'incubateur';
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Masquer le footer sur la page dashboard
        this.showFooter = !event.url.includes('/dashboard');
      }
    });
  }

  ngOnInit() {
    if (typeof document !== 'undefined') {
      AOS.init({
        duration: 800,
        once: false,
        easing: 'ease-out-cubic'
      });
    }
  }
}
