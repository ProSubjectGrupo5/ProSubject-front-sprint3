import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoProfesorGuard implements CanActivate {

  constructor(private route:Router){


  }


  canActivate(){

    if((JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'PROFESOR') && JSON.parse(localStorage.getItem('usuario')).expedienteValidado === 'ACEPTADO'
    || (JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'ALUMNO')){
      return true;
    }else{
      this.route.navigate(['/inicio']);
      return false;
    }

   
  }
  
}
