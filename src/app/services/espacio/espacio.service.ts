import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EspacioService {

  private urlEndPoint: string = environment.domain_backend + '/api/espacios';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  //Inyección de dependencia
  constructor(private http: HttpClient, private route:Router) { }

  getEspacios(): Observable<any[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as any[])
    );
  }


  getEspaciosPorParametros(universidad:string, facultad:string, grado:string, curso:string, asignatura:string):Observable<any[]> {
    let url:string = `${this.urlEndPoint}/espaciosDisponibles?universidad=${universidad}&facultad=${facultad}&grado=${grado}&curso=${curso}&asignatura=${asignatura}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    );
  }

  getEspaciosPorId(id: number){
    let url:string = `${this.urlEndPoint}/${id}`;
    return this.http.get(url).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a los espacios de un profesor.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );
  }

  getEspaciosPorIdDraftMode(id:number){
    let url:string = `${this.urlEndPoint}/draftMode/${id}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a los espacios de un profesor.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );
  }

  getEspaciosPorProfesor(profesorId: number){
    let url:string = `${this.urlEndPoint}/espaciosProfesor/${profesorId}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a los espacios de un profesor.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }

  getEspaciosEditablesPorProfesor(profesorId: number){
    let url:string = `${this.urlEndPoint}/draftModeProfesor/${profesorId}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
      )
  }

  guardarEspacio(espacio: any){

    return this.http.post(this.urlEndPoint, espacio, {headers: this.httpHeaders}).pipe(
      res => {return res}
    );
  }

  editarEspacio(espacio: any){
    return this.http.put(this.urlEndPoint, espacio).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al editar un espacio.', 'No se pueden editar un espacio publicado', 'error');
        return throwError(e);
      })
    );
  }

  getEspaciosPorEstudiante(estudianteId: number){
    let url:string = `${this.urlEndPoint}/espaciosAlumno/${estudianteId}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a los espacios de un alumno.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }


  insertarAlumno(espacioId:number, alumnoId:number){
    let url:string = `${this.urlEndPoint}/insertarAlumno?espacioId=${espacioId}&alumnoId=${alumnoId}`;
    return this.http.put(url, {}).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al inscribirse en el espacio.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })

    );
  }
}
