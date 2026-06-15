import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface ContactRequest {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  reference?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/v1/contact'; // Passe par le proxy, comme les autres services
  private lastSentTime = 0;
  private readonly MIN_INTERVAL = 30000; // 30 s minimum entre deux envois

  constructor(private http: HttpClient) {}

  sendMessage(data: ContactRequest): Observable<ContactResponse> {
    // Garde-fou anti-spam côté client, aligné sur register.service
    const validationError = this.validate(data);
    if (validationError) {
      return throwError(() => ({ message: validationError, status: 400 }));
    }

    this.lastSentTime = Date.now();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Client-Time': new Date().toISOString()
    });

    const payload = {
      ...data,
      telephone: data.telephone?.trim() || null,
      timestamp: new Date().toISOString()
    };

    return this.http.post<ContactResponse>(`${this.apiUrl}/messages`, payload, { headers }).pipe(
      retry(1),
      catchError(error => throwError(() => error))
    );
  }

  private validate(data: ContactRequest): string | null {
    const elapsed = Date.now() - this.lastSentTime;
    if (this.lastSentTime && elapsed < this.MIN_INTERVAL) {
      return `Merci de patienter ${Math.ceil((this.MIN_INTERVAL - elapsed) / 1000)} s avant un nouvel envoi.`;
    }
    if (!data.prenom || !data.nom || !data.email || !data.sujet || !data.message) {
      return 'Tous les champs obligatoires doivent être remplis.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return 'Format email invalide.';
    }
    if (data.message.length < 10) {
      return 'Le message doit contenir au moins 10 caractères.';
    }
    return null;
  }
}
