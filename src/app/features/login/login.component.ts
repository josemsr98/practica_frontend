
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {UserService} from "../../core/services/user.service"
import { CommonModule } from '@angular/common';
import { guardarUsuarioLogado } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService){

  } 
    // Constructor listo para usar
  

  async onLogin() {
    this.errorMessage = '';
    try {
      const result = await this.userService.login(this.username, this.password);
      console.log('Login result:', result);
      if (result) {
        // Guardar solo nickUsuario y contrasena para el login
        guardarUsuarioLogado({ nickUsuario: this.username, contrasena: this.password } as any);
        this.router.navigate(['/usuarios']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } catch (error) {
      this.errorMessage = 'Error al intentar iniciar sesión';
      console.error('Login error:', error);
    }
  }
  // Aquí se implementarán los métodos necesarios para el login
}
