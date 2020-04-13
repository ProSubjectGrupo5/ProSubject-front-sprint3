import { Component, OnInit } from '@angular/core';
import { AdminService, NotificacionService } from 'src/app/services/services.index';
import { NgxSpinnerService } from "ngx-spinner";  
import swal from 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios-olvidados',
  templateUrl: './usuarios-olvidados.component.html',
  styles: []
})
export class UsuariosOlvidadosComponent implements OnInit {

  profesores:any[];
  alumnos:any[];

  constructor(private administradorService:AdminService, private notificacionService:NotificacionService, private spinnerService: NgxSpinnerService ) { }

  ngOnInit() {
    this.administradorService.getProfesoresAEliminar().subscribe(profesores=>{
      this.administradorService.getAlumnosAEliminar().subscribe(alumnos=>{
        this.profesores = profesores;
        this.alumnos = alumnos;
      });
      
    });

  }


  eliminarProfesor(id:number, i:number, email:any){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'   
    });
    Swal.showLoading();

    this.administradorService.elimiarProfesor(id).subscribe(data=>{
      this.notificacionService.enviarEmail(email,"Eliminación de datos del sistema.","Los datos han sido eliminados correctamente del sistema.").subscribe(email=>{
        this.profesores.splice(i,1);
        Swal.close();
        swal.fire('Operación realizada.', 'El profesor ha sido borrado con exito.', 'success');
      });
    });  
  }

  eliminarAlumno(id:number, i:number, email:any){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
     
    });
    Swal.showLoading();

    this.administradorService.elimiarAlumno(id).subscribe(data=>{
      this.notificacionService.enviarEmail(email,"Eliminación de datos del sistema.","Los datos han sido eliminados correctamente del sistema.").subscribe(email=>{
        this.alumnos.splice(i,1);
        Swal.close();
        swal.fire('Operación realizada.', 'El Alumno ha sido borrado con exito.', 'success');
      });
    });     
  }

}
