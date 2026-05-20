import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Usuario } from 'src/app/core/models/user.model';

@Component({
    selector: 'app-user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.css'],
    standalone: true,
    imports: [ CommonModule, FormsModule ]
})
export class UserPopupComponent implements OnInit {
    @Input() usuarioEditar: any = null;
    @Input() modo: 'create' | 'update' = 'create';
    @Output() cerrarPopUpOk = new EventEmitter<void>();
    @Output() cerrarPopUpCancel = new EventEmitter<void>();

    usuario: any = {
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaNacimiento: '',
        genero: { id: '', nombre: '' },
        puestoTrabajo: { id: '', nombre: '' },
        direcciones: [],
        nickUsuario: '',
        contrasena: '',
        admin: false
    };
    generos: any[] = [];
    puestosDeTrabajo: any[] = [];
    direcciones: any[] = [];
    direccionSeleccionada: number | null = null;
    direccionPrincipal: number | null = null;

    constructor(private userService: UserService) {}

    async ngOnInit() {
        // Cargar puestos de trabajo dinámicamente
        const puestos = await this.userService.obtenerPuestosDeTrabajo();
        if (Array.isArray(puestos)) {
            this.puestosDeTrabajo = puestos;
        } else if (puestos && Array.isArray(puestos[0])) {
            this.puestosDeTrabajo = puestos[0];
        }
        // Cargar géneros dinámicamente
        const generos = await this.userService.obtenerGeneros();
        if (Array.isArray(generos)) {
            this.generos = generos;
        } else if (generos && Array.isArray(generos[0])) {
            this.generos = generos[0];
        }
        if (this.modo === 'update' && this.usuarioEditar) {
            this.cargarUsuario(this.usuarioEditar);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['usuarioEditar'] && this.usuarioEditar) {
            this.cargarUsuario(this.usuarioEditar);
        }
        if (changes['modo'] && this.modo === 'create') {
            this.resetForm();
        }
    }

    cargarUsuario(usuario: any) {
        this.usuario = { ...usuario };
        this.direcciones = usuario.direcciones ? usuario.direcciones.map((d: any) => ({ ...d })) : [];
        // Seleccionar principal
        const idxPrincipal = this.direcciones.findIndex((d: any) => d.direccionPrincipal);
        this.direccionPrincipal = idxPrincipal >= 0 ? idxPrincipal : null;
    }

    resetForm() {
        this.usuario = {
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            fechaNacimiento: '',
            genero: { id: '', nombre: '' },
            puestoTrabajo: { id: '', nombre: '' },
            direcciones: [],
            nickUsuario: '',
            contrasena: '',
            admin: false
        };
        this.direcciones = [];
        this.direccionPrincipal = null;
        this.direccionSeleccionada = null;
    }

    onAgregarDireccion() {
        this.direcciones.push({ nombreCalle: '', numeroCalle: '', direccionPrincipal: false });
        this.direccionSeleccionada = this.direcciones.length - 1;
    }

    onActualizarDireccion() {
        // Implementar si es necesario
    }

    onEliminarDireccion() {
        if (this.direccionSeleccionada != null) {
            this.direcciones.splice(this.direccionSeleccionada, 1);
            this.direccionSeleccionada = null;
            if (this.direccionPrincipal === this.direccionSeleccionada) {
                this.direccionPrincipal = null;
            }
        }
    }

    async onSave() {
        // Asignar género y puesto de trabajo
        // Asegurar que usuario.genero y usuario.puestoTrabajo existen y tienen id
        let generoId = (this.usuario.genero && this.usuario.genero.id !== undefined) ? this.usuario.genero.id : this.usuario.generoId;
        let puestoId = (this.usuario.puestoTrabajo && this.usuario.puestoTrabajo.id !== undefined) ? this.usuario.puestoTrabajo.id : this.usuario.puestoDeTrabajoId;
        this.usuario.genero = this.generos.find(g => g.id == generoId) || { id: '', nombre: '' };
        this.usuario.puestoTrabajo = this.puestosDeTrabajo.find(p => p.id == puestoId) || { id: '', nombre: '' };
        if (!this.usuario.contrasena) this.usuario.contrasena = '1234';

        if (this.modo === 'create') {
            // Crear usuario primero
            const usuarioCreado = await this.userService.crearUsuario(this.usuario as Usuario);
            console.log('Respuesta crearUsuario:', usuarioCreado);
            let userId = null;
            // Intentar extraer el id del usuario creado de cualquier formato posible
            if (usuarioCreado) {
                if (usuarioCreado.id) userId = usuarioCreado.id;
                else if (usuarioCreado.body && usuarioCreado.body.id) userId = usuarioCreado.body.id;
                else if (Array.isArray(usuarioCreado) && usuarioCreado[0] && usuarioCreado[0].id) userId = usuarioCreado[0].id;
                else if (usuarioCreado.data && usuarioCreado.data.id) userId = usuarioCreado.data.id;
            }
            if (!userId) {
                alert('No se pudo obtener el id del usuario creado. Revisa la respuesta del backend.');
                return;
            }
            // Guardar direcciones una a una, asociando el usuario creado
            for (let i = 0; i < this.direcciones.length; i++) {
                const dir = { ...this.direcciones[i] };
                dir.direccionPrincipal = (i === this.direccionPrincipal);
                dir.usuarioId = userId;
                dir.numeroCalle = Number(dir.numeroCalle);
                delete dir.usuario;
                console.log('Enviando dirección al backend:', dir);
                await this.userService.crearDireccion(dir);
            }
        } else if (this.modo === 'update') {
            // Actualizar usuario
            const userId = this.usuario.id;
            const usuarioActualizado = await this.userService.actualizarUsuario(userId, this.usuario as Usuario);
            console.log('Respuesta actualizarUsuario:', usuarioActualizado);
            // Actualizar direcciones
            for (let i = 0; i < this.direcciones.length; i++) {
                const dir = { ...this.direcciones[i] };
                dir.direccionPrincipal = (i === this.direccionPrincipal);
                dir.usuarioId = userId;
                dir.numeroCalle = Number(dir.numeroCalle);
                delete dir.usuario;
                if (dir.id) {
                    // Actualizar dirección existente
                    await this.userService.actualizarDireccion(dir.id, dir);
                } else {
                    // Crear nueva dirección
                    await this.userService.crearDireccion(dir);
                }
            }
        }

        this.cerrarPopUpOk.emit();
    }

    onCancel() {
        this.cerrarPopUpCancel.emit();
    }
}
