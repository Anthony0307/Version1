import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent {
  citaForm: FormGroup;
  citaAgendadaExitosa = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.citaForm = this.fb.group({
      paciente: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['']
    });
  }

  agendarCita() {
    if (this.citaForm.valid) {
      this.authService.agendarCita(this.citaForm.value).subscribe(
        response => {
          console.log('Cita agendada exitosamente', response);

          // Muestra el mensaje de cita agendada exitosamente
          this.citaAgendadaExitosa = true;

          // Redirige a la página de inicio después de 1 segundo
          setTimeout(() => {
            this.router.navigate(['/inicio']);
          }, 1000);
        },
        error => {
          console.error('Error al agendar cita', error);
        }
      );
    } else {
      // El formulario no es válido, puedes mostrar mensajes de validación o deshabilitar el botón de agendar cita.
    }
  }
}
