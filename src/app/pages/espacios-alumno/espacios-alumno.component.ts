import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioService } from 'src/app/services/horario/horario.service';

@Component({
  selector: 'app-espacios-alumno',
  templateUrl: './espacios-alumno.component.html',
  styles: [`
  #parentCard{
    background-color: #ff7f26;
}`]
})
export class EspaciosAlumnoComponent implements OnInit {


  horarios:any[];

  
  constructor(private horarioService:HorarioService,
    private router: Router) { }

  ngOnInit() {

    this.horarioService.getHorariosPorAlumno(JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
      this.horarios = data;
      this.formatearFecha()
      console.log(this.horarios);
    });

  }

  formatearFecha(){
    this.horarios.forEach(element => {
      let horaInicio = element.horaInicio.split(':');
      element.horaInicio = horaInicio[0]+':'+horaInicio[1]

      let horaFin = element.horaFin.split(':');
      element.horaFin = horaFin[0]+':'+horaFin[1]
    })
  }


}
