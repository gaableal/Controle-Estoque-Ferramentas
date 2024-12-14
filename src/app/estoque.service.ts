import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obter o cabeçalho de autenticação
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para listar os itens
  getItems(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/itens`, { headers });
  }

  // Método para adicionar um novo item ao backend
  adicionarItem(item: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/itens`, item, { headers });
  }

  // Método para atualizar um item existente no backend
  atualizarItem(id: string, item: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/itens/${id}`, item, { headers });
  }

  // Método para excluir um item no backend
  excluirItem(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/itens/${id}`, { headers });
  }

  // Método para obter um item pelo ID
  getItemPorId(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/itens/${id}`, { headers });
  }

  // Método para fazer upload de imagem
  uploadImagem(imagem: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/itens/upload`, imagem);
  }
}
