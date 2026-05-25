import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'genero-popup',
  templateUrl: './genero-popup.component.html',
  styleUrls: ['./genero-popup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GeneroPopupComponent {
  @Output() cerrar = new EventEmitter<void>();
  generos: any[] = [];
  nuevoGenero: string = '';
  editIndex: number | null = null;
  generoEditado: string = '';

  constructor(private userService: UserService) {
    this.cargarGeneros();
  }

  async cargarGeneros() {
    this.generos = await this.userService.obtenerGeneros();
    if (Array.isArray(this.generos[0])) this.generos = this.generos[0];
  }

  async agregarGenero() {
    if (this.nuevoGenero.trim().length > 0) {
      const generoObj = { nombre: this.nuevoGenero };
      await this.userService.crearGenero(generoObj);
      this.nuevoGenero = '';
      await this.cargarGeneros();
    }
  }

  editarGenero(i: number) {
    this.editIndex = i;
    this.generoEditado = this.generos[i].nombre;
  }

  async guardarEdicion() {
    if (this.editIndex !== null && this.generoEditado.trim().length > 0) {
      const generoObj = { nombre: this.generoEditado };
      await this.userService.actualizarGenero(this.generos[this.editIndex].id, generoObj);
      this.generos[this.editIndex].nombre = this.generoEditado;
      this.editIndex = null;
      this.generoEditado = '';
    }
  }

  async eliminarGenero(i: number) {
    const genero = this.generos[i];
    if (genero && genero.id) {
      await this.userService.eliminarGenero(genero.id);
      await this.cargarGeneros();
    }
  }

  cerrarPopup() {
    this.cerrar.emit();
  }
}
