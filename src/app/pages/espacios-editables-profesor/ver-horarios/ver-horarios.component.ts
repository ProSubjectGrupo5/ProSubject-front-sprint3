import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-ver-horarios',
  templateUrl: './ver-horarios.component.html',
  styleUrls: ['./ver-horarios.component.css']
})
export class VerHorariosComponent implements OnInit {

  horarios: any[];
  alumnosInscritos= new Map();
  espacioId: number;

  constructor(private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private alumnoService:AlumnoService,
    private router: Router) { }

  ngOnInit() {
    this.getHorarios()
  }

  getHorarios(){
    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.espacioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
        this.horarioService.getHorariosPorIdDraftMode(parseInt(paramas.get('id'), 10)).subscribe(data=>{
          this.horarios = data;
          this.formatearFecha()

          this.horarios.forEach(element => { 

            this.alumnoService.getNumeroAlumnosPorHorario(element.id).subscribe(data =>{
             
              this.alumnosInscritos.set(element.id, data);

            });     
          });
        });
      }

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

  editarHorario(id){
    this.router.navigate(['editar-horario', id])
  }

  crearNuevoHorario(id){
    this.router.navigate(['crear-horarios', id])
  }

  volverEspaciosEditables(){
    this.router.navigate(['espacios-editable-profesor'])
  }

  eliminarHorario(id){
    this.horarioService.deleteHorario(id).subscribe(
      res => {
        console.log('Borrado correctamente')
        this.getHorarios()
      },
      error => console.log(error)
    )
  }

}
