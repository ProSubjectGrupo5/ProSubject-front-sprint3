import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


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
    return this.http.post(`${this.urlEndPoint}/signUpProfesor`, profesor, {headers: this.httpHeaders})
  }

  editarProfesor(profesor: any, id: string){
    return this.http.put(`${this.urlEndPoint}/profesores/edit/` + id, profesor, {headers: this.httpHeaders})
  }
}
