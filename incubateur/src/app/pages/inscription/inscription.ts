import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService, RegisterRequest } from '../../services/register.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.scss']
})
export class InscriptionComponent {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  acceptTerms = false;
  loading = false;
  errorMessage = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.firstname || !this.lastname || !this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }
    if (!this.acceptTerms) {
      this.errorMessage = 'Vous devez accepter les conditions générales pour continuer.';
      return;
    }

    const payload: RegisterRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      confirmPassword: this.password,
      role: 'USER'
    };

    this.loading = true;
    this.registerService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/connexion']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.message || err?.error?.message || "Une erreur est survenue lors de l'inscription.";
      }
    });
  }
}
