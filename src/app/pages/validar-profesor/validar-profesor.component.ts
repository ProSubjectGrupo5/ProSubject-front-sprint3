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
    this.profesorService.getProfesores().subscribe(
      data => {
        this.profesores = data
        console.log(this.profesores)
      },
      error => console.log(error)
    )
  }

  aceptarProfesor(id){
    window.alert(id)
  }

  rechazarProfesor(id){
    window.alert(id)
  }


}
