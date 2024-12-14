import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  register(registroData: { nome: string; email: string; senha: string }) {
    return this.http.post(`${this.apiUrl}/register`, registroData);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    console.warn('LocalStorage não está acessível.');
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token não encontrado');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
