import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlEndPoint: string = environment.domain_backend + '/api/carrito';

  constructor(private http: HttpClient) { }

  getCarritoPorIdAlumno(id: string){
    let url:string = `${this.urlEndPoint}/precioMensual/` + id;
    return this.http.get(url).pipe(
      map(response => response as any)
    )
  }

  addHorarioCarrito(idCarrito: string, idHorario: any, idAlumno: string){
    let url:string = `${this.urlEndPoint}/addHorario`;
    const formData: FormData = new FormData();
    formData.append('carritoId', idCarrito)
    formData.append('horarioId', idHorario)
    formData.append('alumId', idAlumno)
    return this.http.post(url, formData).pipe(
      map(response => response as any),
      catchError(e =>{
        swal.fire('Error al añadir horario al carrito.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }

  deleteHorarioCarrito(idCarrito: string, idHorario){
    let url:string = `${this.urlEndPoint}/borrarHorario`;
    const formData: FormData = new FormData();
    formData.append('carritoId', idCarrito)
    formData.append('horarioId', idHorario)
    return this.http.post(url, formData).pipe(
      map(response => response as any)
    )
  }
}
