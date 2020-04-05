import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private urlEndPoint: string = environment.domain_backend + '/api';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient,
    private route: Router) { }

  getProfesorPorId(id: Number){
    let url:string = `${this.urlEndPoint}/profesores/${id}`;
    return this.http.get(url).pipe(
      map(response => response as any)
    )
  }

  registrarProfesor(profesor: any){
    return this.http.post(`${this.urlEndPoint}/signUpProfesor`, profesor).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al registar un profesor.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }

  editarProfesor(profesor: any, id: string){
    return this.http.put(`${this.urlEndPoint}/profesores/edit/` + id, profesor)
  }

  
  getProfesoresPendientesValidacion(){
    return this.http.get(`${this.urlEndPoint}/profesores/validacionExpedientePendiente`).pipe(
      map(response => response as any[])
    )
  }

  aceptarExpediente(profesorId: number){
    return this.http.get(`${this.urlEndPoint}/profesores/aceptarExpediente/${profesorId}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al aceptar un expediente.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );
  }

  rechazarExpediente(profesorId: number){
    return this.http.get(`${this.urlEndPoint}/profesores/rechazarExpediente/${profesorId}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al rechazar un expediente.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );
  }


  comprarPremium(id: string){
    return this.http.get(this.urlEndPoint + '/profesores/pagoTarifaPremium/' + id).pipe(
      map(response => response as any)
    )
  }

  diasPremium(id: string){
    return this.http.get(this.urlEndPoint + '/profesores/comprobarDiasPremium/' + id).pipe(
      map(response => response as any)
    )
  }

}
