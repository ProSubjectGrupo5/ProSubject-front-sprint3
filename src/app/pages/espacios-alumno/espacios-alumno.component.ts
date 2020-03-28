import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { AlumnoService } from 'src/app/services/services.index';

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
  alumnosInscritos=new Map();
  
  constructor(private horarioService:HorarioService,
    private alumnoService: AlumnoService,
    private router: Router) { }

  ngOnInit() {

    this.horarioService.getHorariosPorAlumno(JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
      this.horarios = data;
      this.formatearFecha()

      this.horarios.forEach(element => {
        this.alumnoService.getNumeroAlumnosPorHorario(element.id).subscribe(data =>{
          this.alumnosInscritos.set(element.id, data);
        })
      })

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
