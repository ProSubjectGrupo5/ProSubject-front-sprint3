import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/services.index';

@Component({
  selector: 'app-validar-profesor',
  templateUrl: './validar-profesor.component.html',
  styleUrls: ['./validar-profesor.component.css']
})
export class ValidarProfesorComponent implements OnInit {

  profesores: any[];

  constructor(private profesorService: ProfesorService) { }

  ngOnInit() {
    this.getProfesor();
  }

  getProfesor(){
    this.profesorService.getProfesoresPendientesValidacion().subscribe(
      data => {
        this.profesores = data
      },
      error => console.log(error)
    )
  }

  aceptarExpedienteProfesor(id){
    this.profesorService.aceptarExpediente(id).subscribe(
      res => {
        console.log('Expediente profesor rechazadoº')
        this.getProfesor()
      },
      error => console.log(error)
    )
  }

  rechazarExpedienteProfesor(id){
    this.profesorService.rechazarExpediente(id).subscribe(
      res => {
        console.log('Expediente profesor rechazado')
        this.getProfesor()
      },
      error => console.log(error)
    )
  }


}
