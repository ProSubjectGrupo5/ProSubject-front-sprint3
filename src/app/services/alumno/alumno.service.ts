import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private urlEndPoint: string = environment.domain_backend + '/api';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  registrarAlumno(alumno: any){
    return this.http.post(`${this.urlEndPoint}/signUpAlumno`, alumno, {headers: this.httpHeaders})
  }

  editarAlumno(alumno: any, id: string){
    return this.http.put(`${this.urlEndPoint}/alumnos/edit/` + id, alumno, {headers: this.httpHeaders})
  }


  getNumeroAlumnosPorHorario(idHorario: number){
    return this.http.get(`${this.urlEndPoint}/alumnos/horario/${idHorario}`).pipe(
      map(response => response as any[]),
      map(response => response.length)
    )
  }

  getAlumnosPorHorario(idHorario: number){
    return this.http.get(`${this.urlEndPoint}/alumnos/horario/${idHorario}`).pipe(
      map(response => response as any[])
    )
  }
}
