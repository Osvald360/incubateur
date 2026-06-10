import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-apropos',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './apropos.html',
  styleUrls: ['./apropos.scss']
})
export class AproposComponent implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); this.observer?.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => this.observer!.observe(el));
    }, 100);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  team = [
    {
      name: 'Mohamed Karim',
      role: 'Président & Fondateur',
      bio: 'Ancien cadre dirigeant reconverti dans l\'impact social. Il a fondé F.A.T.E. après 20 ans dans le secteur privé pour redonner ce qu\'il a reçu.',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sarah Moussa',
      role: 'Directrice Exécutive',
      bio: 'Experte en accompagnement entrepreneurial, elle pilote les programmes d\'incubation et veille à l\'impact de chaque parcours.',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'David Leroux',
      role: 'Responsable Accompagnement',
      bio: 'Coach certifié, il suit chaque porteur de projet de l\'idée au lancement avec un ancrage terrain rare.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Amina Diallo',
      role: 'Coordinatrice Insertion',
      bio: 'Spécialiste des politiques de la ville, elle assure le lien entre les entrepreneurs et les dispositifs d\'aide publics.',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Philippe Moreau',
      role: 'Expert Financier',
      bio: 'Ancien banquier, il structure les dossiers de financement et forme les entrepreneurs à la gestion financière.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Christine Dupont',
      role: 'Mentor & Réseau',
      bio: 'Cheffe d\'entreprise engagée, elle ouvre son réseau et partage son expérience avec les nouveaux porteurs.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  partenaires = [
    {
      name: 'F.A.T.E.',
      description: 'Association fondatrice qui porte la vision d\'un entrepreneuriat sans barrière sociale. Elle mobilise les bénévoles et garantit l\'ancrage terrain.',
      categorie: 'Association fondatrice',
      icon: 'foundation'
    },
    {
      name: 'BPI France',
      description: 'Partenaire financier institutionnel qui co-finance certains parcours et oriente les porteurs vers les dispositifs publics d\'aide à la création.',
      categorie: 'Financement',
      icon: 'account_balance'
    },
    {
      name: 'Ville & Métropole',
      description: 'Collectivité partenaire qui met à disposition des locaux, des ressources humaines et facilite l\'accès aux marchés publics locaux.',
      categorie: 'Institutionnel',
      icon: 'location_city'
    },
    {
      name: 'Réseau Entreprendre',
      description: 'Réseau de chefs d\'entreprise bénévoles qui apportent leur expérience, leur carnet d\'adresses et leurs conseils stratégiques aux porteurs de projet.',
      categorie: 'Réseau',
      icon: 'groups'
    },
    {
      name: 'École de Commerce',
      description: 'Partenaire académique qui forme les candidats aux fondamentaux de la gestion d\'entreprise et assure le mentorat par ses étudiants et enseignants.',
      categorie: 'Formation',
      icon: 'school'
    },
    {
      name: 'Caisse des Dépôts',
      description: 'Partenaire stratégique qui abonde la tontine solidaire et accompagne la structuration financière des projets à fort impact territorial.',
      categorie: 'Financement',
      icon: 'savings'
    }
  ];

}
