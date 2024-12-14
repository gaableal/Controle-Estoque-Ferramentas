import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarItensComponent } from './listar-itens/listar-itens.component';
import { AdicionarItemComponent } from './adicionar-item/adicionar-item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditarItemComponent } from './editar-item/editar-item.component';

export const routes: Routes = [
  { path: '', redirectTo: '/listar-itens', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listar-itens', component: ListarItensComponent },
  { path: 'adicionar-item', component: AdicionarItemComponent },
  { path: 'editar-item/:id', component: EditarItemComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
