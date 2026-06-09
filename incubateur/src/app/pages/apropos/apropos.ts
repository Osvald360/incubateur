import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-apropos',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './apropos.html',
  styleUrls: ['./apropos.scss']
})
export class AproposComponent {
  // =========================================================
  //  CONTENU
  // =========================================================
  stats = [
    { number: '[à confirmer]', label: 'Projets accompagnés', icon: 'trending_up' },
    { number: '[à confirmer]', label: 'Taux de réussite', icon: 'verified_user' },
    { number: '[à confirmer]', label: 'Experts mobilisés', icon: 'groups_2' },
    { number: '[à confirmer]', label: 'Financements solidaires', icon: 'payments' }
  ];

  values = [
    {
      title: 'Solidarité',
      description:
        "Nous croyons en la force du collectif et de l'entraide pour transformer les territoires.",
      icon: 'diversity_3'
    },
    {
      title: 'Innovation sociale',
      description:
        'Nous soutenons les solutions innovantes qui répondent aux défis sociaux et environnementaux.',
      icon: 'emoji_objects'
    },
    {
      title: 'Équité',
      description:
        "Nous garantissons un accès équitable à l'entrepreneuriat, quelle que soit l'origine sociale.",
      icon: 'gavel'
    },
    {
      title: 'Impact',
      description:
        "Nous mesurons notre réussite à l'aune de l'impact social et territorial de nos actions.",
      icon: 'query_stats'
    }
  ];
}
