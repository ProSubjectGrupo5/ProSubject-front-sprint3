import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private urlEndPoint: string = environment.domain_backend + '/api/files';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/pdf'
  });

  constructor(private http: HttpClient) { }

  uploadFile(file){
    return this.http.post(`${this.urlEndPoint}/uploadFile`, file).pipe(
      catchError(e =>{
        console.error(e.error);
        swal.fire('Error al intentar subir el expediente.', `${e.error.message}`, 'error');
        return throwError(e);
      })
    );;
  }

  downloadFile(fileId){
    return this.http.get(`${this.urlEndPoint}/downloadFile/${fileId}`,
    {responseType: 'blob', headers: this.httpHeaders});
  }

  getFile(fileId: number){
    return this.http.get(`${this.urlEndPoint}/${fileId}`).pipe(
      catchError(e =>{
        console.error(e.error);
        swal.fire('Error al intentar descargar el expediente.', `${e.error.message}`, 'error');
        return throwError(e);
      })
    );
  }
}
