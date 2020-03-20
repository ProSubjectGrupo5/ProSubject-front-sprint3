import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}
