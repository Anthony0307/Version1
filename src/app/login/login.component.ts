import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      this.authService.iniciarSesion(this.loginForm.value).subscribe(
        response => {
          console.log('Inicio de sesión exitoso', response);

          // Actualiza el estado de autenticación a true
          this.authService.actualizarEstadoAutenticacion(true);

          // Redirige a la página de inicio después de 1 segundo
          setTimeout(() => {
            this.router.navigate(['/inicio']);
          }, 1000);
        },
        error => {
          console.error('Error al iniciar sesión', error);
        }
      );
    } else {
      // El formulario no es válido, se puede mostrar mensajes de validación o deshabilitar el botón de agendar cita.
    }
  }
}
