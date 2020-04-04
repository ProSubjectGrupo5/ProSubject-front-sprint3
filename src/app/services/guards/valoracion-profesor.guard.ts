import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EspacioService } from '../espacio/espacio.service';
import { AlumnoService } from '../alumno/alumno.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionProfesorGuard implements CanActivate {

  constructor(private route:Router,
    private espacioService: EspacioService){}


  canActivate(next: ActivatedRouteSnapshot){

    const idEspacio = next.paramMap.get('id');

    if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'PROFESOR'){
        const idProfesor = JSON.parse(localStorage.getItem('usuario')).id

        let espacios = this.espacioService.getEspaciosPorProfesor(idProfesor).toPromise()
        return espacios.then(data => {

            for(let espacio of data){
                if(espacio.id == idEspacio){
                    return true
                }
            }
            this.route.navigate(['espacios-profesor'])
            return false
        })

    }else if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'ALUMNO'){
        
        const idAlumno = JSON.parse(localStorage.getItem('usuario')).id

        return true;

    }else{
        return true;
    }  



    
    
  }
  
}
