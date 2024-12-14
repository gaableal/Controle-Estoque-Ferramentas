import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EstoqueService } from '../estoque.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

declare global {
  interface Window {
    bootstrap: any;
  }
}

interface Item {
  _id?: string;
  nome: string;
  quantidade: number;
  imagens?: string[];
  descricao?: string;
}

@Component({
  selector: 'app-listar-itens',
  standalone: true,
  templateUrl: './listar-itens.component.html',
  styleUrls: ['./listar-itens.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ListarItensComponent implements OnInit {
  itens: Item[] = [];
  itensFiltrados: Item[] = [];
  filtro: string = '';
  mensagem: string = '';
  termoPesquisa: string = '';
  itemSelecionado: Item = {
    nome: '',
    quantidade: 0,
    imagens: [],
    descricao: '',
  };

  constructor(private estoqueService: EstoqueService, private router: Router) {}

  sair(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.estoqueService.getItems()
      .pipe(
        catchError((erro) => {
          console.error('Erro ao carregar itens:', erro);
          this.mensagem = 'Erro ao carregar itens. Tente novamente mais tarde.';
          return of([]);
        })
      )
      .subscribe((dados) => {
        this.itens = dados;
        this.itensFiltrados = [...this.itens];
      });
  }

  editarItem(id: string): void {
    console.log(`Editar item com ID: ${id}`);
  }

  excluirItem(itemId: string): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.estoqueService.excluirItem(itemId)
        .pipe(
          catchError((erro) => {
            console.error('Erro ao excluir item:', erro);
            this.mensagem = 'Erro ao excluir item. Tente novamente.';
            return of(null);
          })
        )
        .subscribe(() => {
          this.carregarItens();
        });
    }
  }

  filtrarItens(): void {
    if (this.termoPesquisa.trim() === '') {
      this.itensFiltrados = [...this.itens];
    } else {
      const termoPesquisaLowerCase = this.termoPesquisa.toLowerCase();
      this.itensFiltrados = this.itens.filter(item =>
        item.nome.toLowerCase().includes(termoPesquisaLowerCase)
      );
    }
  }

  alternarTema(): void {
    const body = document.querySelector('body');
    if (body) {
      body.classList.toggle('dark-theme');
    }
  }

  abrirDetalhes(item: Item): void {
    this.itemSelecionado = item;
    const detalhesModal = new window.bootstrap.Modal(
      document.getElementById('detalhesModal')
    );
    detalhesModal.show();
  }
}
