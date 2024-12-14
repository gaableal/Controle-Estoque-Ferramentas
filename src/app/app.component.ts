import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controleDeEstoque';

  constructor(public themeService: ThemeService, public authService: AuthService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }
}
