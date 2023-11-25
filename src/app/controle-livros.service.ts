import { Injectable } from '@angular/core';
import { Livro } from './livro';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private static baseURL = 'http://localhost:3132/livros';

  async obterLivros(): Promise<Livro[]> {
    try {
      const response = await fetch(ControleLivrosService.baseURL);
      const livrosMongo: LivroMongo[] = await response.json();
      return livrosMongo.map((livroMongo) => this.converterLivroMongoParaLivro(livroMongo));
    } catch (error) {
      console.error('Erro ao obter livros: ', error);
      throw error;
    }
  }

  async excluirLivro(codigo: string): Promise<boolean> {
    try {
      const response = await fetch(`${ControleLivrosService.baseURL}/${codigo}`, { method: 'DELETE' });
      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Erro ao excluir livro: ', error);
      throw error;
    }
  }

  async incluirLivro(livro: Livro): Promise<boolean> {
    try {
      const livroMongo: LivroMongo = this.converterLivroParaLivroMongo(livro);
      const response = await fetch(ControleLivrosService.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroMongo),
      });
      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Erro ao incluir livro: ', error);
      throw error;
    }
  }

  private converterLivroMongoParaLivro(livroMongo: LivroMongo): Livro {
    return new Livro(
      livroMongo._id || '',
      livroMongo.codEditora,
      livroMongo.titulo,
      livroMongo.resumo,
      livroMongo.autores
    );
  }

  private converterLivroParaLivroMongo(livro: Livro): LivroMongo {
    return {
      _id: livro.getId(),
      codEditora: livro.getCodEditora(),
      titulo: livro.getTitulo(),
      resumo: livro.getResumo(),
      autores: livro.getAutores(),
    };
  }
}
