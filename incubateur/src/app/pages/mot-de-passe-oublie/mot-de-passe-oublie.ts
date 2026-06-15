import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './mot-de-passe-oublie.html',
  styleUrls: ['./mot-de-passe-oublie.scss']
})
export class MotDePasseOublieComponent {
  resetForm: FormGroup;
  isSubmitting = false;
  sent = false;
  sentEmail = '';

  constructor(
    private fb: FormBuilder,
    private resetService: PasswordResetService,
    private notify: NotificationService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (!this.resetForm.valid) {
      this.resetForm.markAllAsTouched();
      this.notify.showWarning('Email manquant', 'Renseignez une adresse email valide.');
      return;
    }
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const email = this.resetForm.value.email as string;

    this.resetService.requestReset(email).subscribe({
      next: () => this.handleSuccess(email),
      error: (error) => {
        this.isSubmitting = false;
        // Réseau coupé : on prévient. Sinon on reste générique (anti-énumération).
        if (error.status === 0) {
          this.notify.showError('Serveur injoignable', 'Impossible de contacter le serveur. Réessayez plus tard.');
        } else {
          this.handleSuccess(email);
        }
      }
    });
  }

  private handleSuccess(email: string) {
    this.isSubmitting = false;
    this.sent = true;
    this.sentEmail = email;
  }

  resend() {
    this.sent = false;
    this.resetForm.reset();
  }
}
