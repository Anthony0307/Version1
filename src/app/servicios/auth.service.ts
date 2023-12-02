import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private estadoAutenticacionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  estadoAutenticacion: Observable<boolean> = this.estadoAutenticacionSubject.asObservable();

  // Método que actualiza el estado de autenticación
  actualizarEstadoAutenticacion(autenticado: boolean) {
    this.estadoAutenticacionSubject.next(autenticado);
  }

  registrarUsuario(usuario: any): Observable<any> {
    // Lógica para registrar usuario (puedes hacer llamadas HTTP aquí si es necesario)
    return of({ success: true, message: 'Usuario registrado con éxito' }).pipe(
      delay(1000)
    );
  }

  iniciarSesion(credenciales: any): Observable<any> {
    // Lógica para iniciar sesión (puedes hacer llamadas HTTP aquí si es necesario)
    return of({ success: true, message: 'Inicio de sesión exitoso' }).pipe(
      delay(1000)
    );
  }

  agendarCita(cita: any): Observable<any> {
    // Lógica para agendar cita (puedes hacer llamadas HTTP aquí si es necesario)
    return of({ success: true, message: 'Cita agendada con éxito' }).pipe(
      delay(1000)
    );
  }

  registrarDiagnostico(diagnostico: any): Observable<any> {
    // Lógica para registrar diagnóstico (puedes hacer llamadas HTTP aquí si es necesario)
    return of({ success: true, message: 'Registro de diagnóstico exitoso' }).pipe(
      delay(1000)
    );
  }
}
