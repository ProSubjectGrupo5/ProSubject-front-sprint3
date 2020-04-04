import { Component, OnInit } from '@angular/core';
import { ValoracionService } from 'src/app/services/valoracion/valoracion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {

  valoraciones: any[];
  espacioId: number;

  constructor(private valoracionesService: ValoracionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramas=>{
        this.espacioId = parseInt(paramas.get('id'), 10);
        
        this.valoracionesService.getValoracionesPorEspacio(this.espacioId).subscribe(
          data => {
            this.valoraciones = data
          }
        )
    })


  }

  volverBuscador(){
    if(JSON.parse(localStorage.getItem('usuario')) && JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'PROFESOR'){
      this.router.navigate(['espacios-profesor'])
    }else{
      this.router.navigate(['busqueda-asignatura'])
    }
  }


}
