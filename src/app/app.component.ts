import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { LivrosListaComponent } from "./livro-lista/livro-lista.component";
import { LivroDadosComponent } from './livro-dados/livro-dados.component';
import { AppRoutingModule } from './app.routes';
import { RouterModule, Routes } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppComponent {
  title = 'livros-angular';
}
