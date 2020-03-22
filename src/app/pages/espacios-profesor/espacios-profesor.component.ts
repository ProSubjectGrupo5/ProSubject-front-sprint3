import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/horario/horario.service';

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

  constructor(private horarioService:HorarioService) { }

  ngOnInit() {

    this.horarioService.getHorariosPorProfesor(JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
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
