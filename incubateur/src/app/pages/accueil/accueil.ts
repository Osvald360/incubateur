import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, RouterModule],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.scss']
})
export class AccueilComponent implements OnInit {
  showCelebration = false;
  emailValue = '';
  emailSent = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['candidature'] === 'success') {
        setTimeout(() => {
          this.showSuccessMessage();
          this.router.navigate(['/'], { replaceUrl: true });
        }, 500);
      }
    });
  }

  private showSuccessMessage() {
    this.showCelebration = true;
    this.notificationService.showCelebration(
      'Candidature envoyée avec succès',
      'Merci pour votre confiance. Notre équipe examine votre dossier et vous recontacte sous 48h.',
      12000
    );
    setTimeout(() => (this.showCelebration = false), 8000);
  }

  submitEmail() {
    if (!this.emailValue?.includes('@')) return;
    this.emailSent = true;
    this.emailValue = '';
  }

  tontineFeatures = [
    {
      icon: 'savings',
      title: 'Épargner ensemble',
      text: "Des citoyens mettent leur épargne en commun dans un fonds solidaire au service de l'entrepreneuriat local.",
    },
    {
      icon: 'school',
      title: 'Accompagner les projets',
      text: "Notre incubateur aide les entrepreneurs à structurer, développer et professionnaliser leurs projets.",
    },
    {
      icon: 'rocket_launch',
      title: 'Financer les lauréats',
      text: "Les projets sélectionnés reçoivent un financement direct et un accompagnement stratégique sur la durée.",
    }
  ];

  ambitionStats = [
    { num: '2 500', label: 'sociétaires engagés' },
    { num: '100+', label: 'projets financés' },
    { num: '300', label: 'entrepreneurs accompagnés' },
    { num: '7', label: 'secteurs couverts' },
  ];

  domaines = [
    { icon: 'agriculture', label: 'Agriculture & agroalimentaire' },
    { icon: 'storefront', label: 'Commerce & distribution' },
    { icon: 'handyman', label: 'Artisanat' },
    { icon: 'support_agent', label: 'Services à la personne' },
    { icon: 'computer', label: 'Numérique & innovation' },
    { icon: 'menu_book', label: 'Éducation & formation' },
    { icon: 'park', label: 'Économie verte' },
  ];
}
