import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  contactInfo = [
    {
      title: 'Bureau Principal',
      address: '37, rue de la Solidarité',
      city: '93000 Bobigny',
      schedule: 'Lundi au vendredi : 9h00 - 17h00',
      icon: 'location_on',
      phone: '01 23 45 67 89',
      email: 'contact@envolimpact.fr'
    },
    {
      title: 'Antenne Sud',
      address: '15, avenue de l\'Entrepreneuriat',
      city: '13001 Marseille',
      schedule: 'Lundi, mercredi, vendredi : 14h00 - 18h00',
      icon: 'location_on',
      phone: '04 91 23 45 67',
      email: 'marseille@envolimpact.fr'
    }
  ];

  contactReasons = [
    { value: 'candidature', label: 'Question sur ma candidature' },
    { value: 'financement', label: 'Informations sur le financement' },
    { value: 'partenariat', label: 'Proposition de partenariat' },
    { value: 'mentorat', label: 'Devenir mentor/expert' },
    { value: 'investissement', label: 'Investissement solidaire' },
    { value: 'presse', label: 'Demande presse/média' },
    { value: 'autre', label: 'Autre demande' }
  ];

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      sujet: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      this.notify.showWarning('Formulaire incomplet', 'Veuillez remplir les champs obligatoires.');
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.notify.showSuccess(
          'Message envoyé',
          res?.message || 'Merci ! Nous vous répondrons sous 24 h.'
        );
        this.contactForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 0) {
          this.notify.showError('Serveur injoignable', 'Impossible de contacter le serveur. Réessayez plus tard.');
        } else if (error.status === 429) {
          this.notify.showWarning('Trop de tentatives', 'Vous avez déjà envoyé un message récemment. Patientez un instant.');
        } else {
          this.notify.showError(
            'Envoi impossible',
            error.error?.message || error.message || 'Une erreur est survenue. Réessayez.'
          );
        }
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (field?.hasError('email')) {
      return 'Email invalide';
    }
    if (field?.hasError('minlength')) {
      return `Minimum ${field.errors?.['minlength'].requiredLength} caractères`;
    }
    return '';
  }

}
