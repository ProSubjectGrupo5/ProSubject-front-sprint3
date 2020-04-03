import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ValoracionService {

  private urlEndPoint: string = environment.domain_backend + '/api/valoraciones';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient,
    private router: Router) { }

  getValoracionesPorEspacio(espacioId: number){
    return this.http.get(`${this.urlEndPoint}/espacio/${espacioId}`).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al crear una valoración.', `${e.error.mensaje}`, 'error');
        this.router.navigate(['login'])
        return throwError(e);
      })
    );
  }

  guardarValoracion(valoracion){
    return this.http.post(this.urlEndPoint, valoracion, {headers: this.httpHeaders}).pipe(
      res => {return res},
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al crear una valoración.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }
}
