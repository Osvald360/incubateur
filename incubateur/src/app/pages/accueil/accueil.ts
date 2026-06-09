import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.scss']
})
export class AccueilComponent implements OnInit {
  showCelebration = false;

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

  // =========================================================
  //  CONTENU — source : note de cadrage Envol Impact (F.A.T.E.)
  // =========================================================

  // Vision · Mission · Promesse
  essence = [
    {
      num: '01',
      label: 'Notre vision',
      title: "Entreprendre ne devrait pas dépendre de son point de départ.",
      description:
        "Quel que soit son parcours, son milieu ou son lieu de vie, chaque porteur de projet mérite les moyens d'entreprendre, de réussir et de faire grandir sa communauté."
    },
    {
      num: '02',
      label: 'Notre mission',
      title: "Repérer et financer celles et ceux que les circuits classiques laissent de côté.",
      description:
        "Nous accompagnons des entrepreneurs à fort potentiel issus de milieux défavorisés ou de zones rurales, pour bâtir leur autonomie économique et leur impact sur le terrain."
    },
    {
      num: '03',
      label: 'Notre promesse',
      title: "D'une idée à une activité qui change la donne.",
      description:
        "Transformer les idées en opportunités, les opportunités en activités, et les activités en moteurs de changement durable pour tout un territoire."
    }
  ];

  // Le parcours d'incubation : de l'idée au développement
  steps = [
    {
      icon: 'how_to_reg',
      title: 'Candidature',
      description:
        "Vous nous présentez votre projet et rejoignez les sociétaires d'Envol Impact."
    },
    {
      icon: 'architecture',
      title: 'Construction',
      description:
        "On structure l'idée avec vous : modèle économique, faisabilité, premiers jalons."
    },
    {
      icon: 'fact_check',
      title: 'Validation',
      description:
        "Le Comité d'Investissement évalue la viabilité et l'impact social de votre projet."
    },
    {
      icon: 'savings',
      title: 'Financement',
      description:
        "Les projets retenus reçoivent un soutien financier partiel de notre fonds solidaire."
    },
    {
      icon: 'rocket_launch',
      title: 'Développement',
      description:
        "On reste à vos côtés sur la mise en œuvre et le suivi, jusqu'au décollage de l'activité."
    }
  ];

  // 7 secteurs d'activité accompagnés (note de cadrage)
  projectTypes = [
    {
      icon: 'agriculture',
      title: 'Agriculture & agroalimentaire',
      description:
        "Production agricole, transformation et distribution de produits locaux."
    },
    {
      icon: 'storefront',
      title: 'Commerce & distribution',
      description:
        "Vente, micro-commerce et commerce de proximité au cœur des territoires."
    },
    {
      icon: 'handyman',
      title: 'Artisanat & métiers manuels',
      description:
        "Couture, coiffure, menuiserie, fabrication artisanale et savoir-faire locaux."
    },
    {
      icon: 'volunteer_activism',
      title: 'Services à la personne',
      description:
        "Aide à domicile, soutien scolaire, accompagnement social et services de proximité."
    },
    {
      icon: 'devices',
      title: 'Numérique & innovation',
      description:
        "Marketing, création de contenu, freelancing et services en ligne."
    },
    {
      icon: 'school',
      title: 'Éducation & insertion',
      description:
        "Formation, renforcement des compétences et accompagnement vers l'emploi."
    },
    {
      icon: 'eco',
      title: 'Économie verte',
      description:
        "Recyclage, gestion des déchets, énergie durable et agriculture écologique."
    }
  ];

  // Principes de gouvernance
  engagements = [
    {
      icon: 'visibility',
      title: 'Transparence',
      description:
        "Nous rendons compte régulièrement de l'usage des ressources et des résultats obtenus."
    },
    {
      icon: 'groups',
      title: 'Participation',
      description:
        "Les sociétaires prennent part aux orientations et à l'évolution du fonds."
    },
    {
      icon: 'balance',
      title: 'Égalité des chances',
      description:
        "Chaque projet est jugé sur son potentiel et son impact, sans aucune discrimination."
    },
    {
      icon: 'verified_user',
      title: 'Responsabilité',
      description:
        "Une gestion rigoureuse des fonds issus du mécénat, des subventions et des partenaires."
    }
  ];
}
