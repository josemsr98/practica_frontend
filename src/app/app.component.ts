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
    RouterOutlet
  ],
  standalone: true,

})

export class AppComponent {
  usuarioLogado: any = null;

  constructor() {
    this.usuarioLogado = obtenerUsuarioLogado();
  }
}
