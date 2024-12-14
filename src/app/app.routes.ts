import { Routes } from '@angular/router';
import { ListarItensComponent } from './listar-itens/listar-itens.component';
import { AdicionarItemComponent } from './adicionar-item/adicionar-item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listar-itens', component: ListarItensComponent, canActivate: [AuthGuard] },
  { path: 'adicionar-item', component: AdicionarItemComponent, canActivate: [AuthGuard] },
  { path: 'editar-item/:id', component: AdicionarItemComponent, canActivate: [AuthGuard] }
];
