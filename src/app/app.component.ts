import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CITAS_MEDICAS';
  usuarioAutenticado: boolean = false; // Asignamos un valor por defecto

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Suscribirse al Observable para recibir actualizaciones del estado de autenticación
    this.authService.estadoAutenticacion.subscribe((autenticado: boolean) => {
      this.usuarioAutenticado = autenticado;
    });
  }

  cerrarSesion() {
    // Lógica para cerrar sesión (si es necesario)
    this.authService.actualizarEstadoAutenticacion(false);
    this.router.navigate(['/login']);
  }
}
