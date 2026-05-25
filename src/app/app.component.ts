import { GeneroPopupComponent } from './features/genero-popup/genero-popup.component';
import { PuestoPopupComponent } from './features/puesto-popup/puesto-popup.component';
import { Component } from '@angular/core';
import {RouterOutlet, Router} from "@angular/router";
import { obtenerUsuarioLogado } from './core/services/utils.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: "app-root",
  styleUrls: ['./app.component.css'],
  templateUrl: "./app.component.html",
  imports: [
    CommonModule,
    RouterOutlet,
    GeneroPopupComponent,
    PuestoPopupComponent
  ],
  standalone: true,

})

export class AppComponent {
  usuarioLogado: any = null;
  mostrarPopupGenero = false;
  mostrarPopupPuesto = false;


  constructor(private router: Router) {
    this.usuarioLogado = obtenerUsuarioLogado();
  }

  get mostrarGestion(): boolean {
    // Solo muestra si hay usuario logueado y no está en la ruta de login
    return !!this.usuarioLogado && !this.router.url.includes('login');
  }

  abrirPopupGenero() {
    this.mostrarPopupGenero = true;
  }
  cerrarPopupGenero() {
    this.mostrarPopupGenero = false;
  }

  abrirPopupPuesto() {
    this.mostrarPopupPuesto = true;
  }
  cerrarPopupPuesto() {
    this.mostrarPopupPuesto = false;
  }
}
