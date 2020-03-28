import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { AlumnoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-espacios-profesor',
  templateUrl: './espacios-profesor.component.html',
  styles: [`
  #parentCard{
    background-color: #ff7f26;
}`]
})
export class EspaciosProfesorComponent implements OnInit {


  horarios:any[];
  alumnosIncritos = new Map();

  constructor(private horarioService:HorarioService,
    private alumnoService: AlumnoService) { }

  ngOnInit() {

    this.horarioService.getHorariosNoEditablesPorProfesor(JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
      this.horarios = data;
      this.formatearFecha()

      this.horarios.forEach(element => {
        this.alumnoService.getAlumnosPorHorario(element.id).subscribe(data =>{
          this.alumnosIncritos.set(element.id, data);
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
