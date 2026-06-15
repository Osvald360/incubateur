import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cgu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cgu.html',
  styleUrls: ['./legal.scss']
})
export class CguComponent {
  readonly lastUpdate = 'juin 2026';
}
