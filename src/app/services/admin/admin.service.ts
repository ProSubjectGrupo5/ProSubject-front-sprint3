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
}
