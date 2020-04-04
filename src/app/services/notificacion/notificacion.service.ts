import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private urlEndPoint: string = environment.domain_backend + '/api/mail';

  constructor(private http: HttpClient) { }

  enviarEmail(to, subject, body){
    return this.http.post(`${this.urlEndPoint}/enviar`, {},{responseType: 'text',
      params: {
        'to': to,
        'subject': subject,
        'body': body
      },
    },).pipe(
      res => {return res}
    )
  }
}
