import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  perfil: any;
  carrito: any;
  error: string;
  
  constructor(private route: Router, private carritoService: CarritoService) { }

  ngOnInit() {
    this.getPerfil();
  }

  private getPerfil() {
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.perfil = JSON.parse(localStorage.getItem('usuario'));
      this.getCarrito(this.perfil.id)
    }else{
      this.route.navigate(['/inicio']);
    }
  }

  private getCarrito(idAlumno: string) {
    this.carritoService.getCarritoPorIdAlumno(idAlumno).subscribe(
      res => {
        this.carrito = res
        console.log(res)
      },
      error =>{
        this.error = error.error.mensaje;
      })
  }

  eliminarHorario(idAlumno: string, idCarrito: string){
    this.carritoService.deleteHorarioCarrito(idAlumno, idCarrito).subscribe(
      res => {
        this.carrito = this.getCarrito(idAlumno);
      })
  }

}
