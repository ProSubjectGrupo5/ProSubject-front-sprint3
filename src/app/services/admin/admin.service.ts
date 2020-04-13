import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlEndPoint: string = environment.domain_backend + '/api/administradores';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient) { }



  crearAdmin(administrador: any){
    return this.http.post(this.urlEndPoint, administrador, {headers: this.httpHeaders}).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al crear el administrador.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }

  editarAdmin(admin: any, id: string){
    return this.http.put(`${this.urlEndPoint}/edit/` + id, admin, {headers: this.httpHeaders})
  }





  getProfesoresAEliminar(){
    let url:string = `${this.urlEndPoint}/profesores`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al obtener los profesores a eliminar.', `${e.error.mensaje}`, 'error');
        //this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );

  }

  getAlumnosAEliminar(){
    let url:string = `${this.urlEndPoint}/alumnos`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al obtener los alumnos a eliminar.', `${e.error.mensaje}`, 'error');
        //this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );

  }


  elimiarProfesor(id: number){
    return this.http.delete(`${this.urlEndPoint}/profesor/${id}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al intentar eliminar el profesor.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }


  elimiarAlumno(id: number){
    return this.http.delete(`${this.urlEndPoint}/alumno/${id}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al intentar eliminar el alumno.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }




}
