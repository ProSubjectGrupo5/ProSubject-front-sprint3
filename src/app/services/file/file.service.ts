import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private urlEndPoint: string = environment.domain_backend + '/api/files';

  constructor(private http: HttpClient) { }

  uploadFile(file){
    return this.http.post(`${this.urlEndPoint}/uploadFile`, file);
  }
}
