import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlEndPoint: string = environment.domain_backend + '/api/cursos';

  //Inyección de dependencia
  constructor(private http: HttpClient) { }

  getCursos(): Observable<any[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as any[])
    );
  }


  getCursosPorGrado(nombre:string):Observable<any[]> {
    let url:string = `${this.urlEndPoint}/grado?nombre=${nombre}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al realizar la busqueda.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }
}
