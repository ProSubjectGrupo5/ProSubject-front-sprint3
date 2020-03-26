import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private urlEndPoint: string = environment.domain_backend + '/api';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getProfesorPorId(id: Number){
    let url:string = `${this.urlEndPoint}/profesores/${id}`;
    return this.http.get(url).pipe(
      map(response => response as any)
    )
  }

  registrarProfesor(profesor: any){
    return this.http.post(`${this.urlEndPoint}/signUpProfesor`, profesor, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al registar un profesor.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }

  editarProfesor(profesor: any, id: string){
    return this.http.put(`${this.urlEndPoint}/profesores/edit/` + id, profesor, {headers: this.httpHeaders})
  }

  //Mientras
  getProfesores(){
    return this.http.get(`${this.urlEndPoint}/profesores`).pipe(
      map(response => response as any[])
    )
  }
}
