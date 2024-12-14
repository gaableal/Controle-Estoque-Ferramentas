import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface LoginData {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  loginData: LoginData = { email: '', senha: '' };
  mensagemErro: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para redirecionar para a página de registro
  irParaRegistro(): void {
    console.log('Redirecionando para a página de registro...');
    this.router.navigate(['/register']);
  }

  // Método para realizar o login
  onSubmit(): void {
    this.authService.login(this.loginData.email, this.loginData.senha).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/listar-itens']);
        } else {
          this.mensagemErro = 'Erro ao obter token. Tente novamente.';
        }
      },
      (error) => {
        this.mensagemErro = 'Credenciais inválidas. Tente novamente.';
      }
    );
  }
}
