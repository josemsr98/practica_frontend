import { GeneroPopupComponent } from './features/genero-popup/genero-popup.component';
import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { obtenerUsuarioLogado } from './core/services/utils.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: "app-root",
  styleUrls: ['./app.component.css'],
  templateUrl: "./app.component.html",
  imports: [
    CommonModule,
    RouterOutlet,
    GeneroPopupComponent
  ],
  standalone: true,

})

export class AppComponent {
  usuarioLogado: any = null;
  mostrarPopupGenero = false;

  constructor() {
    this.usuarioLogado = obtenerUsuarioLogado();
  }

  abrirPopupGenero() {
    this.mostrarPopupGenero = true;
  }

  cerrarPopupGenero() {
    this.mostrarPopupGenero = false;
  }
}
