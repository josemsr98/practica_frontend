import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, UserPopupComponent]
})
export class UserListComponent implements OnInit {
  @Output() cerrarPopUpOk = new EventEmitter<void>();
  @Output() cerrarPopUpCancel = new EventEmitter<void>();

  public usuarios: any[] = [];
  public usuarioSeleccionado: any = null;
  public usuarioSeleccionadoId: any = null;

  modoPopup: String = 'CLOSED';

  constructor(private router: Router, private userService: UserService) {
    this.userService = userService;
  }


  async ngOnInit() {
    this.usuarios = await this.userService.obtenerUsuarios();
    if (this.usuarios.length > 0) {
      this.usuarioSeleccionadoId = this.usuarios[0].id;
      this.usuarioSeleccionado = this.usuarios[0];
    }
    console.log(this.usuarios);
  }
  onSeleccionarUsuario(id: any) {
    this.usuarioSeleccionadoId = id;
    this.usuarioSeleccionado = this.usuarios.find(u => u.id === id);
  }


  onCerrarPopUpOk() {
    this.modoPopup = 'CLOSED';
  }

  onCerrarPopUpCancel() {
    this.modoPopup = 'CLOSED';
  }

  launchPopup() {

    this.modoPopup = 'LAUNCH';
  }

  // @TODO: Implementar propiedades, atributos, métodos... necesarios para el funcionamiento del listado de usuarios
  onLogout() {
    this.router.navigate(['/login']);
  }
  onCrearUsuario() { }
  onActualizarUsuario() { }
  onEliminarUsuario() { }
  getDireccionPrincipal(usuario: any): string {
    const dir = usuario.direcciones?.find((d: any) => d.direccionPrincipal);
    if (!dir) return '';
    return dir.nombreCalle + (dir.numeroCalle ? ', ' + dir.numeroCalle : '');
  }
  getOtrasDirecciones(usuario: any): number {
    return usuario.direcciones?.filter((d: any) => !d.direccionPrincipal).length || 0;
  }
}
