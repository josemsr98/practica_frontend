




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/user.model';
import to, { headers, loadCredentials } from "./utils.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  async obtenerUsuarioPorId(id: number, nickUsuario: string, contrasena: string) {
    const url = `http://localhost:8080/usuarios/${id}`;
    const params = { nickUsuario, contrasena };
    return await to(
      this.http
        .get<any>(url, { params })
        .toPromise()
    );
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
  async obtenerPuestosDeTrabajo() {
    // Si tienes backend, cambia la URL por la del endpoint real
    const url = 'http://localhost:8080/puestos-de-trabajo';
    return await to(
      this.http.get<any[]>(url).toPromise()
    );
  }
    async obtenerGeneros() {
    // Si tienes backend, cambia la URL por la del endpoint real
    const url = 'http://localhost:8080/generos?nickUsuario=&contrasena=';
    return await to(
      this.http.get<any[]>(url).toPromise()
    );
  }
    async crearGenero(genero: any) {
    const url = 'http://localhost:8080/generos?nickUsuario=&contrasena=';
    return await to(
      this.http
        .post<any>(url, genero, { params: loadCredentials(), headers })
        .toPromise()
    );
  }
    async actualizarGenero(id: number, genero: any) {
    const url = `http://localhost:8080/generos/${id}?nickUsuario=&contrasena=`;
    return await to(
      this.http
        .put<any>(url, genero, { params: loadCredentials(), headers })
        .toPromise()
    );
  }
    async eliminarGenero(id: number) {
    const url = `http://localhost:8080/generos/${id}`;
    return await to(
      this.http
        .delete<any>(url, { params: loadCredentials(), headers })
        .toPromise()
    );
  }
}
