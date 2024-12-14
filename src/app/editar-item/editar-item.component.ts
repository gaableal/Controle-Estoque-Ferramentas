import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditarItemComponent implements OnInit {
  item: any = {
    nome: '',
    quantidade: 0,
    descricao: ''
  };
  mensagemErro: string = '';

  constructor(
    private estoqueService: EstoqueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.estoqueService.getItemPorId(itemId).subscribe(
        (dados) => {
          if (dados) {
            console.log('Dados recebidos:', dados);
            this.item = {
              nome: dados.nome || '',
              quantidade: dados.quantidade || 0,
              descricao: dados.descricao || '',
            };
          } else {
            this.mensagemErro = 'Item não encontrado.';
          }
        },
        (erro) => {
          console.error('Erro ao carregar item:', erro);
          this.mensagemErro = 'Erro ao carregar item.';
        }
      );
    }
  }

  onSubmit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.estoqueService.atualizarItem(itemId, this.item).subscribe(
        () => {
          this.router.navigate(['/listar-itens']);
        },
        (erro) => {
          console.error('Erro ao atualizar item:', erro);
          this.mensagemErro = 'Erro ao atualizar item.';
        }
      );
    }
  }
}
