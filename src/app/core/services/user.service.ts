import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/user.model';
import to from "./utils.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

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
    // Simulación usando el mock de usuarios
    const result = await to(
      this.http.get<Usuario[]>('/assets/mocks/users.json').toPromise()
    );
    // Si hay error, 'result' será un array con el error
    if (Array.isArray(result)) {
      return null;
    }
    const usuario = result.find(
      (u: Usuario) => u.nickUsuario === username && u.contrasena === password
    );
    return usuario || null;
  }

}
