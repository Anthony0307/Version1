import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-diagnostico',
  templateUrl: './registrar-diagnostico.component.html',
  styleUrls: ['./registrar-diagnostico.component.scss']
})
export class RegistrarDiagnosticoComponent {
  diagnosticoForm: FormGroup;
  diagnosticoRegistradoExitoso = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.diagnosticoForm = this.fb.group({
      paciente: ['', Validators.required],
      enfermedad: ['', Validators.required],
      tratamiento: [''],
      observaciones: ['']
    });
  }

  registrarDiagnostico() {
    if (this.diagnosticoForm.valid) {
      this.authService.registrarDiagnostico(this.diagnosticoForm.value).subscribe(
        response => {
          console.log('Diagnóstico registrado exitosamente', response);

          // Muestra el mensaje de diagnóstico registrado exitosamente
          this.diagnosticoRegistradoExitoso = true;

          // Redirige a la página de inicio después de 1 segundo
          setTimeout(() => {
            this.router.navigate(['/inicio']);
          }, 1000);
        },
        error => {
          console.error('Error al registrar diagnóstico', error);
        }
      );
    } else {
      // El formulario no es válido, puedes mostrar mensajes de validación o deshabilitar el botón de registrar diagnóstico.
    }
  }
}
