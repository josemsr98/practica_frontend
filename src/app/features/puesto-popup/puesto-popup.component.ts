import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'puesto-popup',
  templateUrl: './puesto-popup.component.html',
  styleUrls: ['./puesto-popup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PuestoPopupComponent {
  @Output() cerrar = new EventEmitter<void>();
  puestos: any[] = [];
  nuevoPuesto: string = '';
  editIndex: number | null = null;
  puestoEditado: string = '';

  constructor(private userService: UserService) {
    this.cargarPuestos();
  }

  async cargarPuestos() {
    this.puestos = await this.userService.obtenerPuestosDeTrabajo();
    if (Array.isArray(this.puestos[0])) this.puestos = this.puestos[0];
  }

  async agregarPuesto() {
    if (this.nuevoPuesto.trim().length > 0) {
      const puestoObj = { nombre: this.nuevoPuesto };
      await this.userService.crearPuesto(puestoObj);
      this.nuevoPuesto = '';
      await this.cargarPuestos();
    }
  }

  editarPuesto(i: number) {
    this.editIndex = i;
    this.puestoEditado = this.puestos[i].nombre;
  }

  async guardarEdicion() {
    if (this.editIndex !== null && this.puestoEditado.trim().length > 0) {
      const puestoObj = { nombre: this.puestoEditado };
      await this.userService.actualizarPuesto(this.puestos[this.editIndex].id, puestoObj);
      this.puestos[this.editIndex].nombre = this.puestoEditado;
      this.editIndex = null;
      this.puestoEditado = '';
    }
  }

  async eliminarPuesto(i: number) {
    const puesto = this.puestos[i];
    if (puesto && puesto.id) {
      await this.userService.eliminarPuesto(puesto.id);
      await this.cargarPuestos();
    }
  }

  cerrarPopup() {
    this.cerrar.emit();
  }
}
