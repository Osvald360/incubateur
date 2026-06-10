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
      icon: 'percent',
      title: 'Taux Ultra-Bas',
      text: 'Un crédit solidaire pour te propulser, pas pour t\'étouffer. La tontine permet de casser les taux bancaires traditionnels.',
      highlight: false
    },
    {
      icon: 'hourglass_empty',
      title: 'Durée Longue',
      text: 'Prends le temps de construire. Les remboursements sont étalés intelligemment pour te laisser respirer et développer ton activité.',
      highlight: true
    },
    {
      icon: 'gps_fixed',
      title: 'Suivi Trimestriel',
      text: 'Tous les 3 mois, un point stratégique avec nos experts pour éviter les pièges et ajuster ta trajectoire.',
      highlight: false
    }
  ];

  profiles = [
    {
      icon: 'workspace_premium',
      title: 'Propriétaire',
      text: 'Monte ta propre structure de A à Z. Le prêt de la tontine sert de capital de départ massif.'
    },
    {
      icon: 'work',
      title: 'Salarié de sa boîte',
      text: 'Sois incubé et deviens salarié de ta propre entreprise pour un démarrage sécurisé.'
    },
    {
      icon: 'pie_chart',
      title: 'Actionnaire',
      text: 'Deviens actionnaire d\'un projet du réseau Envol en apportant ta force sans gérer seul.'
    }
  ];
}
