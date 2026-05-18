
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UserService} from "../../core/services/user.service"

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
      if (result) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } catch (error) {
      this.errorMessage = 'Error al intentar iniciar sesión';
    }
  }
  // Aquí se implementarán los métodos necesarios para el login
}
