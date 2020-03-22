import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/services.index';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  horarios: any[]
  espacioId:number

  constructor(private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public loginService: LoginService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.espacioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
          this.horarioService.getHorariosDeEspacio(this.espacioId).subscribe(
            res => {
              this.horarios = res
            this.formatearHora()
          }
        )
      }
    });
  }

  formatearHora(){
    this.horarios.forEach(element => {
      let horaInicio = element.horaInicio.split(':');
      element.horaInicio = horaInicio[0]+':'+horaInicio[1]

      let horaFin = element.horaFin.split(':');
      element.horaFin = horaFin[0]+':'+horaFin[1]
    })
  }

  volverDetallesEspacio(id){
    this.router.navigate(['detalles-espacio', id])
  }

  inscribirse(horarioId:number){
    
    if(!localStorage.getItem('usuario')){
      this.router.navigateByUrl('/login');
    }else{
      console.log(this.espacioId);
      console.log(JSON.parse(localStorage.getItem('usuario')).id);
      this.horarioService.insertarAlumno(horarioId,JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
        console.log(data);
        this.router.navigateByUrl('/espacios-alumno');
      });
    }
  }

}
