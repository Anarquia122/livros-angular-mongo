import { Component, NgModule, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Router, ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from '../app.routes';

@Component({
  selector: 'app-livro-dados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro-dados.component.html',
  styleUrl: './livro-dados.component.css'
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro;
  public autoresForm: string = '';
  public editoras: Array<Editora> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.livro = new Livro()
  }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    console.log('Editoras:', this.editoras);
  }

  get livroTitulo(): string {
    return this.livro.getTitulo();
  }
  set livroTitulo(value: string) {
    this.livro.setTitulo(value);
  }

  get livroResumo(): string {
    return this.livro.getResumo();
  }
  set livroResumo(value: string) {
    this.livro.setResumo(value);
  }

  get livroCodEditora(): number {
    return this.livro.getCodEditora();
  }
  set livroCodEditora(value: number) {
    this.livro.setCodEditora(value);
  }

  atualizarAutores(): void {
    this.livro.setAutoresFromString(this.autoresForm);
  }

  atualizarCodEditora(event: any): void {
    this.livro.setCodEditora(Number(event.target.value));
  }

  incluir(): void {
    this.atualizarAutores();

    const titulo = this.livro.getTitulo();
    const resumo = this.livro.getResumo();
    const codEditora = this.livroCodEditora;
    const autores = this.livro.getAutores();

    console.log('Dados do livro: ', titulo, resumo, codEditora, autores);

    const novoLivro = new Livro('', codEditora, titulo, resumo, autores);

    // Utilizando o método assíncrono incluirLivro do serviço ControleLivrosService
    this.servLivros.incluirLivro(novoLivro).then(() => {
      // Navegando para "/livros" ao final da execução do método incluir do controlador
      this.router.navigateByUrl('/livros');
    });
  }

}
