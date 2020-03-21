import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-horarios',
  templateUrl: './ver-horarios.component.html',
  styleUrls: ['./ver-horarios.component.css']
})
export class VerHorariosComponent implements OnInit {

  horarios: any[];
  espacioId: number;

  constructor(private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.espacioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
        this.horarioService.getHorariosDeEspacio(parseInt(paramas.get('id'), 10)).subscribe(data=>{
          this.horarios = data;
          this.formatearFecha()
          console.log(this.horarios);
        });
      }

    });

  }

  formatearFecha(){
    this.horarios.forEach(element => {
      let horaInicio = element.fechaInicio.split(':');
      element.fechaInicio = horaInicio[0]+':'+horaInicio[1]

      let horaFin = element.fechaFin.split(':');
      element.fechaFin = horaFin[0]+':'+horaFin[1]
    })
  }

  editarHorario(id){
    this.router.navigate(['editar-horario', id])
  }

  crearNuevoHorario(id){
    this.router.navigate(['crear-horarios', id])
  }

  volverEspaciosEditables(){
    this.router.navigate(['espacios-editable-profesor'])
  }

}
