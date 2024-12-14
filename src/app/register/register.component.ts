import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  registroData = {
    nome: '',
    email: '',
    senha: ''
  };
  mensagemErro: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Passa o objeto `registroData` diretamente ao método `register`
    this.authService.register(this.registroData).subscribe({
      next: () => {
        // Após o registro bem-sucedido, redireciona para a página de login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.mensagemErro = 'Falha ao registrar. Por favor, tente novamente.';
        console.error('Erro ao registrar:', err);
      }
    });
  }
}
