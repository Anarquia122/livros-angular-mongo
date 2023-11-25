import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from '../app.routes';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro-lista.component.html',
  styleUrl: './livro-lista.component.css'
})

//se n der certo, colocar implements OnInit na frente
export class LivrosListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();

    // Utilizando o modelo assíncrono
    this.servLivros.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir(codigoLivro: string): void {
    // Alterando a assinatura do método excluir
    this.servLivros.excluirLivro(codigoLivro).then(() => {
      // Chamada assíncrona para obterTodos ao final da execução de excluir
      this.servLivros.obterLivros().then((livros) => {
        this.livros = livros;
      });
    });
  }

  obterNome(codEditora: number): string {
    return this.servEditora.getNomeEditora(codEditora);
  }

}