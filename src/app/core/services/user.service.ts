



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/user.model';
import to, { headers, loadCredentials } from "./utils.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  async obtenerUsuarioPorId(id: number) {
    return await to(
      this.http
        .get<Usuario>('/assets/mocks/user.json')
        .toPromise()
    )
  }

  async obtenerUsuarios() {
    const url = 'http://localhost:8080/usuarios';
    return await to(
      this.http
        .get<Usuario[]>(url, {params:loadCredentials()})
        .toPromise()
    )
  }

  async login(nickUsuario : string, contrasena: string): Promise<boolean> {
    const params = { nickUsuario, contrasena };
    const result = await to(
      this.http.get<boolean>(
        'http://localhost:8080/usuarios/iniciarSesion',
        { params }
      ).toPromise()
    );
    if (Array.isArray(result) && result.length === 1 && result[0] instanceof Error) {
      console.error('Error al hacer login:', result[0]);
      return false;
    }
    return result as boolean;
  }
    async crearUsuario(usuario: Usuario) {
    const url = 'http://localhost:8080/usuarios';
    return await to(
      this.http
        .post<Usuario>(url, usuario, { params: loadCredentials(), headers })
        .toPromise()
    );
  }
    async crearDireccion(direccion: any) {
    const url = 'http://localhost:8080/direcciones/crear';
    return await to(
      this.http
        .post<any>(url, direccion, { params: loadCredentials(), headers })
        .toPromise()
    );
  }
  
  async actualizarUsuario(id: number, usuario: Usuario) {
    const url = `http://localhost:8080/usuarios/${id}`;
    return await to(
      this.http
        .put<Usuario>(url, usuario, { params: loadCredentials(), headers })
        .toPromise()
    );
  }

  async actualizarDireccion(id: number, direccion: any) {
    const url = `http://localhost:8080/direcciones/actualizar/${id}`;
    return await to(
      this.http
        .put<any>(url, direccion, { params: loadCredentials(), headers })
        .toPromise()
    );
  }
    async eliminarUsuario(id: number) {
    const url = `http://localhost:8080/usuarios/${id}`;
    return await to(
      this.http
        .delete(url, { params: loadCredentials(), headers })
        .toPromise()
    );
  }

}
