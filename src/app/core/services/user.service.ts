import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/user.model';
import to from "./utils.service";


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
    return await to(
      this.http
        .get<Usuario>('/assets/mocks/user.json')
        .toPromise()
    )
  }

  async login(username: string, password: string): Promise<Usuario | null> {
    const result = await to(
      this.http.get<Usuario[]>('/assets/mocks/users.json').toPromise()
    );
    // Si es un error, la función 'to' devuelve un array con el error en la posición 0
    if (Array.isArray(result) && result.length === 1 && result[0] instanceof Error) {
      console.error('Error al obtener usuarios:', result[0]);
      return null;
    }
    // Si es un array de usuarios
    console.log('Usuarios obtenidos:', result);
    const usuario = (result as Usuario[]).find(
      (u: Usuario) => u.nickUsuario === username && u.contrasena === password
    );
    return usuario || null;
  }

}
