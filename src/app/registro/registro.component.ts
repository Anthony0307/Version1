import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?(\d{10})$/)]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['paciente', Validators.required],
      especialidad: [''],
      fechaNacimiento: [''],
      genero: [''],
      direccion: [''],
      enfermedadesCronicas: [''],
      alergias: ['']
    });
  }

  registrarUsuario() {
    if (this.registroForm.valid) {
      const tipoUsuarioControl = this.registroForm.get('tipoUsuario');

      if (tipoUsuarioControl) {
        const tipoUsuario = tipoUsuarioControl.value;

        this.authService.registrarUsuario(this.registroForm.value).subscribe(
          response => {
            console.log(`Usuario registrado con éxito: ${tipoUsuario}`, response);

            // Muestra el mensaje de registro exitoso
            this.registroExitoso = true;

            // Redirige al componente de login después de 1 segundo
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          },
          error => {
            console.error(`Error al registrar usuario: ${tipoUsuario}`, error);
          }
        );
      } else {
        console.error('Error: No se pudo obtener el control de tipoUsuario.');
      }
    } else {
      // El formulario no es válido, se puede mostrar mensajes de validación o deshabilitar el botón de agendar cita.
    }
  }
}
