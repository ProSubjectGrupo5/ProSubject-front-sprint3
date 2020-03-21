import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) { }

  guardarHorario(horario: any){

    return this.http.post(this.urlEndPoint, horario, {headers: this.httpHeaders}).pipe(
      res => {return res}
    );
  }

  crearHorario(horario: any){
    let url:string = `${this.urlEndPoint}/crearUnHorario`;

    return this.http.post(url, horario, {headers: this.httpHeaders}).pipe(
      res => {return res}
    );
  }

  editarHorario(horario: any){
    let url:string = `${this.urlEndPoint}/modificarUnHorario`;

    return this.http.put(url, horario)

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



  insertarAlumno(horarioId:number, alumnoId:number){
    let url:string = `${this.urlEndPoint}/insertarAlumno?horarioId=${horarioId}&alumnoId=${alumnoId}`;
    return this.http.put(url, {}).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al inscribirse en el horario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })

    );
  }
}
