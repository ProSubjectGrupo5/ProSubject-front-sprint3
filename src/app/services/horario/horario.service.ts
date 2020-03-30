import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlEndPoint: string = environment.domain_backend + '/api/horarios';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  //Inyección de dependencia
  constructor(private http: HttpClient, private route:Router) { }

  guardarHorario(horario: any){

    return this.http.post(this.urlEndPoint, horario, {headers: this.httpHeaders}).pipe(
      res => {return res}
    );
  }

  crearHorario(horario: any){
    let url:string = `${this.urlEndPoint}/crearUnHorario`;

    return this.http.post(url, horario, {headers: this.httpHeaders}).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.message);
        swal.fire('Error al crear un horario.', 'No se pueden crear horarios a espacios publicados', 'error');
        return throwError(e);
      })
    );
  }

  editarHorario(horario: any){
    let url:string = `${this.urlEndPoint}/modificarUnHorario`;

    return this.http.put(url, horario).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.error);
        swal.fire('Error al editar un horario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );

  }

  deleteHorario(horarioId: number){
    return this.http.delete(`${this.urlEndPoint}/${horarioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al intentar eliminar un horario.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['inicio'])
        return throwError(e);
      })
    );
  }

  getHorarioPorId(idHorario: number){
    return this.http.get(`${this.urlEndPoint}/${idHorario}`).pipe(
      map(response => response as any)
    )
  }

  getHorariosDeEspacio(espacioId: number){
    let url:string = `${this.urlEndPoint}/espacio/${espacioId}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    )
  }

  getHorariosDraftMode(horarioId: number){
    let url:string = `${this.urlEndPoint}/draftMode/${horarioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a los horarios de un profesor.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );
  }

  getHorariosPorIdDraftMode(espacioId: number){
    let url:string = `${this.urlEndPoint}/espacioDraftMode/${espacioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a los horarios de un profesor.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );
  }

  getHorariosPorAlumno(idAlumno: number){
    let url:string = `${this.urlEndPoint}/alumno/${idAlumno}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    )
  }

  getHorariosPorProfesor(idProfesor: number){
    let url:string = `${this.urlEndPoint}/profesor/${idProfesor}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    )
  }

  getHorariosNoEditablesPorProfesor(idProfesor:number){
    let url:string = `${this.urlEndPoint}/espaciosNoEditables/profesor/${idProfesor}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    )
  }



  insertarAlumno(horarios:any, alumnoId:number){
    let url:string = `${this.urlEndPoint}/insertarAlumno?alumnoId=${alumnoId}`;
    return this.http.put(url, horarios).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al inscribirse en el horario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })

    );
  }
}
