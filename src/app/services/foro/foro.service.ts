import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private urlEndPoint: string = environment.domain_backend + '/api/foros';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  

  constructor(private http: HttpClient, private route:Router) { }


  getForoPorEspacio(espacioId:number){
    let url:string = `${this.urlEndPoint}/espacio/${espacioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}&autoridad=${JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad}`;
    return this.http.get(url).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder al foro.', `${e.error.mensaje}`, 'error');
        this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );

  }
}
