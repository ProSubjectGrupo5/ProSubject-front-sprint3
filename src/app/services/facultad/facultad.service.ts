import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  private urlEndPoint: string = environment.domain_backend + '/api/facultades';

  constructor(private http: HttpClient) { }


  getFacultades(): Observable<any[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as any[])
    );
  }


  getFacultadesPorUniversidad(universidad:string):Observable<any[]> {
    let url:string = `${this.urlEndPoint}/busquedaFacultades?universidad=${universidad}`;
    return this.http.get(url).pipe(
      map(response => response as any[])
    );
    
  

    
  }

  getIdFacultad(nombreFacultad){
    return this.http.get(`${this.urlEndPoint}/facuId?nombreFacu=${nombreFacultad}`).pipe(
      map(response => response as any)
    )
  }

  getFacultadPorId(idFacultad){
    return this.http.get(`${this.urlEndPoint}/${idFacultad}`).pipe(
      map(response => response as any)
    )
  }
}
