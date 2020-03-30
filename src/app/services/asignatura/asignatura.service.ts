import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private urlEndPoint: string = environment.domain_backend + '/api/asignaturas';

  //Inyección de dependencia
  constructor(private http: HttpClient) { }

  getAsignaturas(): Observable<any[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as any[])
    );
  }

  getAsignaturasPorUniversidadYFacultadYGradoYCurso(universidad:string, facultad:string, grado:string, curso:string):Observable<any[]> {
    let url:string = `${this.urlEndPoint}/busquedaAsignaturas?universidad=${universidad}&facultad=${facultad}&grado=${grado}&curso=${curso}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    );
  }

  getAsignaturaPorId(id: Number){
    let url:string = `${this.urlEndPoint}/${id}`;
    return this.http.get(url).pipe(
      map(response => response as any)
    )
  }

  getAsignaturaPorNombre(nombre:string){
    let url:string = `${this.urlEndPoint}/nombre?nombre=${nombre}`;
    return this.http.get(url).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error en la creación.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );

  }
}
