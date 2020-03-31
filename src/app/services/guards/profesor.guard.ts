import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfesorService } from '../profesor/profesor.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuard implements CanActivate {

  constructor(private route:Router, private profesorService: ProfesorService){


  }


  canActivate(){

    let user = this.profesorService.getProfesorPorId(JSON.parse(localStorage.getItem('usuario')).id).toPromise()
    return user.then(data => {
      localStorage.setItem('usuario', JSON.stringify(data))

      if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'PROFESOR' && JSON.parse(localStorage.getItem('usuario')).expedienteValidado === 'ACEPTADO'){
        return true;
      }else{
        this.route.navigate(['/inicio']);
        return false;
      }
    })
    
    
  }
  
}
