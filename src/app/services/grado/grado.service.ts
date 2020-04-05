import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  private urlEndPoint: string = environment.domain_backend + '/api/grados';

  //Inyección de dependencia
  constructor(private http: HttpClient) { }

  getGrados(): Observable<any[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as any[])
    );
  }

  getGradosPorUniversidadYFacultad(universidad:string, facultad:string):Observable<any[]> {
    let url:string = `${this.urlEndPoint}/busquedaGrados?universidad=${universidad}&facultad=${facultad}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    );
  }


  getIdGrado(nombreGrado){
    return this.http.get(`${this.urlEndPoint}/gradoId?nombreGrado=${nombreGrado}`).pipe(
      map(response => response as any)
    )
  }

  getGradoPorId(idGrado){
    return this.http.get(`${this.urlEndPoint}/${idGrado}`).pipe(
      map(response => response as any)
    )
  }




  
}
