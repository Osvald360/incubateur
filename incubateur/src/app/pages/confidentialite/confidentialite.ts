import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confidentialite',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confidentialite.html',
  styleUrls: ['../cgu/legal.scss']
})
export class ConfidentialiteComponent {
  readonly lastUpdate = 'juin 2026';
}
