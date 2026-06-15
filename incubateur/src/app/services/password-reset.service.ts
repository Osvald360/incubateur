import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PasswordResetResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = '/api/v1/auth'; // Même base que l'authentification

  constructor(private http: HttpClient) {}

  /**
   * Demande l'envoi d'un lien de réinitialisation à l'adresse fournie.
   * Le backend renvoie toujours un succès générique (anti-énumération de comptes).
   */
  requestReset(email: string): Observable<PasswordResetResponse> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return throwError(() => ({ message: 'Format email invalide.', status: 400 }));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http
      .post<PasswordResetResponse>(
        `${this.apiUrl}/forgot-password`,
        { email: email.trim().toLowerCase() },
        { headers }
      )
      .pipe(catchError(error => throwError(() => error)));
  }
}
