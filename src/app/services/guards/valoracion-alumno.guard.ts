import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EspacioService } from '../espacio/espacio.service';
import { AlumnoService } from '../alumno/alumno.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionAlumnoGuard implements CanActivate {

  espacioId: number;

  constructor(private route:Router,
    private alumnoService: AlumnoService){}


  canActivate(next: ActivatedRouteSnapshot){

    const idEspacio = next.paramMap.get('id');

    if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'ALUMNO'){
        
      const idAlumno = JSON.parse(localStorage.getItem('usuario')).id

      let alumnos = this.alumnoService.getAlumnosDeUnEspacio(idEspacio).toPromise()
      return alumnos.then(data => {

        for(let alumno of data){
            if(alumno.id == idAlumno){
                return true
            }
        }
        this.route.navigate(['espacios-alumno'])
        return false
    })

    }else{
        return true;
    }  



    
    
  }
  
}
