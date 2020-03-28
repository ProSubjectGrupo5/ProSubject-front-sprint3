import { Component, OnInit } from '@angular/core';
import { EspacioService } from 'src/app/services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espacios-editables-profesor',
  templateUrl: './espacios-editables-profesor.component.html',
  styleUrls: ['./espacios-editables-profesor.component.css']
})
export class EspaciosEditablesProfesorComponent implements OnInit {

  espacios: any[];

  constructor(private espacioService: EspacioService,
    private router: Router) { }

  ngOnInit() {

    this.getEspacios();

  }

  getEspacios(){
    this.espacioService.getEspaciosPorProfesor(JSON.parse(localStorage.getItem('usuario')).id)
    .subscribe(
      data => this.espacios = data
    )
  }

  verHorarios(id){
    this.router.navigate(['ver-horarios', id])
  }

  editarEspacio(id){
    this.router.navigate(['editar-espacio', id])
  }

  borrarEspacio(id){
    this.espacioService.deleteEspacio(id).subscribe(
      res => {
        console.log('Borrado'),
        this.getEspacios();
      },
      error => console.log(error)
    )
  }

}
