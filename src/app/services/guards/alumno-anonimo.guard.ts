import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoAnonimoGuard implements CanActivate {

  constructor(private route:Router){


  }


  canActivate(){
    
    if(localStorage.getItem('usuario') === null || (JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad !== 'PROFESOR' && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad !== 'ADMIN')){
      return true;
    }else{
      this.route.navigate(['/inicio']);
      return false;
    }
  }
  
}
