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

  parcours = [
    { icon: 'groups', title: 'Sociétaires', text: 'Des citoyens mettent leur épargne en commun.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { icon: 'savings', title: "Fonds d'épargne solidaire", text: "Une réserve collective dédiée à l'impact.", img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { icon: 'school', title: 'Incubateur Envol Impact', text: 'Les projets sont structurés et accompagnés.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { icon: 'diversity_3', title: 'Entrepreneurs accompagnés', text: 'Financement et suivi stratégique sur la durée.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { icon: 'trending_up', title: 'Emplois & impact social', text: 'Des retombées concrètes sur le territoire.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ];

  differenciation = [
    { icon: 'account_balance', text: "Un fonds d'investissement solidaire, pas une simple plateforme." },
    { icon: 'school', text: 'Un incubateur qui accompagne les projets sur la durée.' },
    { icon: 'groups', text: 'Une communauté de sociétaires citoyens et engagés.' },
  ];
}
