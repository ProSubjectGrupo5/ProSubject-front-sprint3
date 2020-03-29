import { Component, OnInit } from '@angular/core';
import { ProfesorService, FileService } from 'src/app/services/services.index';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-validar-profesor',
  templateUrl: './validar-profesor.component.html',
  styleUrls: ['./validar-profesor.component.css']
})
export class ValidarProfesorComponent implements OnInit {

  profesores: any[];
  fichero;

  constructor(private profesorService: ProfesorService,
    private fileService: FileService) { }

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

  descargarExpediente(id){
    this.fileService.getFile(id).subscribe(res =>{
      this.fichero = res;
      this.fileService.downloadFile(this.fichero.id).subscribe(
        res => {
          saveAs(res , this.fichero.fileName)
        }
      )
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
