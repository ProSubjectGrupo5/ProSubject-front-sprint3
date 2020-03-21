import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {filter, map} from 'rxjs/operators'
import { BreadcrumbsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {


  titulo:string;
  constructor(private router: Router, private title:Title, private breadcrumbsService:BreadcrumbsService) {

    this.getDataRouter().subscribe(data=>{

      if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'ALUMNO'){
        this.breadcrumbsService.menu = [
          { titulo: 'Login', url: '/login' },
          { titulo: 'Busqueda de espacios', url: '/busqueda-asignatura' },
          { titulo: 'Mis clases', url: '/espacios-alumno'},
        ];
      }else if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'PROFESOR'){
        this.breadcrumbsService.menu = [
          { titulo: 'Login', url: '/login' },
          { titulo: 'Creación de espacio', url: '/creacion-espacio'},
          { titulo: 'Mis espacios', url: '/espacios-profesor'},
        ];
      }else if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'ADMIN'){
        this.breadcrumbsService.menu = [
          { titulo: 'Login', url: '/login' },
          { titulo: 'Crear administrador', url: '/nuevo-admin' },
        ];
      }else{
        this.breadcrumbsService.menu = [
          { titulo: 'Login', url: '/login' },
          { titulo: 'Busqueda de espacios', url: '/busqueda-asignatura' },
        ];
      }


      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);
      console.log(data);
    });

   }

  ngOnInit() {
  }


  getDataRouter(){
    return this.router.events.pipe(

      filter(evento => evento instanceof ActivationEnd),
      filter((evento:ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento:ActivationEnd) => evento.snapshot.data)

    );
  }
}
