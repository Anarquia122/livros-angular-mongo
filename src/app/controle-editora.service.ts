import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  private editoras: Editora[];

  constructor() {
      this.editoras = [
          new Editora(1, 'Rocco'),
          new Editora(2, 'VR Editora'),
          new Editora(3, 'Novo Século'),
      ];
  }

  getNomeEditora(codEditora: number): string {
      const editora = this.editoras.find((e) => e.getCodEditora() === codEditora);

      if (editora) {
        return editora.getNome();
      } else {
        return 'Editora não encontrada'
      }
  }

  getEditoras(): Editora[] {
      return this.editoras;
  }
}
