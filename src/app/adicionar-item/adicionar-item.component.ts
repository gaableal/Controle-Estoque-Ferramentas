import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-adicionar-item',
  templateUrl: './adicionar-item.component.html',
  styleUrls: ['./adicionar-item.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AdicionarItemComponent {
  item = {
    nome: '',
    quantidade: 0,
    descricao: '',
    imagens: [] as File[], // Aceita múltiplos arquivos
  };

  mensagemErro: string = '';

  constructor(private estoqueService: EstoqueService, private router: Router) {}

  // Método chamado quando o formulário é enviado
  onSubmit(): void {
    if (!this.item.nome || this.item.quantidade <= 0) {
      this.mensagemErro = 'Por favor, preencha os campos obrigatórios.';
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.item.nome.trim());
    formData.append('quantidade', this.item.quantidade.toString());
    formData.append('descricao', this.item.descricao.trim());

    // Adiciona todas as imagens ao FormData
    if (this.item.imagens.length > 0) {
      this.item.imagens.forEach((file) => {
        formData.append('imagens', file);
      });
    }

    this.estoqueService.adicionarItem(formData).subscribe(
      () => this.router.navigate(['/listar-itens']),
      (erro) => {
        console.error('Erro ao adicionar item:', erro);
        this.mensagemErro = 'Erro ao adicionar item. Por favor, tente novamente.';
      }
    );
  }

  // Método chamado quando o usuário seleciona arquivos
  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.item.imagens = Array.from(files);
    }
  }

  // Método para cancelar e redirecionar para a lista de itens
  cancelar(): void {
    this.router.navigate(['/listar-itens']);
  }
}
