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
export class RespuestaService {

  private urlEndPoint: string = environment.domain_backend + '/api/respuestas';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private route:Router) { }



  getRespuestasPorForo(foroId:number){
    let url:string = `${this.urlEndPoint}/foro/${foroId}`;
    return this.http.get(url).pipe(
      map(response => response as any[]),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al acceder a la lista de respuestas.', `${e.error.mensaje}`, 'error');
        //this.route.navigate(['/inicio']);
        return throwError(e);
      })
    );

  }

  insertarComentario(respuesta:any){
    let url:string = `${this.urlEndPoint}`;
    return this.http.post(url, respuesta, {headers: this.httpHeaders}).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al insertar un comentario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })

    );
  }


  
}
