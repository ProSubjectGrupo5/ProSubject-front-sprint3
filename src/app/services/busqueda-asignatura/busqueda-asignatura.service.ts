import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusquedaAsignaturaService {
  private urlEndPoint: string = environment.domain_backend + '/api/universidades';

  //Inyección de dependencia
  constructor(private http: HttpClient) { }

  getUniversidades(): Observable<any[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as any[])
    );
  }

  getIdUniversidad(nombreUniversidad){
    return this.http.get(`${this.urlEndPoint}/uniId?nombreUni=${nombreUniversidad}`).pipe(
      map(response => response as any)
    )
  }

  getUniversidadPorId(idUniversidad){
    return this.http.get(`${this.urlEndPoint}/${idUniversidad}`).pipe(
      map(response => response as any)
    )
  }
}
