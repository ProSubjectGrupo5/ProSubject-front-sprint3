import { Component, OnInit } from '@angular/core';
import { ValoracionService } from 'src/app/services/valoracion/valoracion.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EspacioService, AlumnoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-crear-valoracion',
  templateUrl: './crear-valoracion.component.html',
  styleUrls: ['./crear-valoracion.component.css']
})
export class CrearValoracionComponent implements OnInit {

  valoraciones: any[];
  espacioId: number;

  form: FormGroup;

  valoracion = {
    puntuacion:'',
    comentario:'',
    alumno:'',
    profesor:'',
    espacio:''
  }

  constructor(private fb: FormBuilder, 
    private valoracionesService: ValoracionService,
    private espacioService: EspacioService,
    private alumnoService: AlumnoService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramas=>{
        this.espacioId = parseInt(paramas.get('id'), 10);
        this.getValoraciones()
    })

    this.form = this.fb.group({
      puntuacion: new FormControl(0),
      comentario: new FormControl('', Validators.required)
    })

  }

  getValoraciones(){
    this.valoracionesService.getValoracionesPorEspacio(this.espacioId).subscribe(
      data => {
        this.valoraciones = data
      }
    )
  }

  onRatingSet(value){
    this.form.controls['puntuacion'].setValue(value)
  }

  submit(){
    
    this.valoracion.comentario = this.form.get('comentario').value;
    this.valoracion.puntuacion = this.form.get('puntuacion').value;

    this.espacioService.getEspaciosPorId(this.espacioId).subscribe(res =>{
      this.valoracion.espacio = res;
      this.valoracion.profesor = res.profesor;

      this.alumnoService.getAlumnoPorId(JSON.parse(localStorage.getItem('usuario')).id).subscribe(res => {
        this.valoracion.alumno = res;

        this.valoracionesService.guardarValoracion(this.valoracion).subscribe(
          res => {
            console.log('Valoracion guardada')
            this.getValoraciones()
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
      )
    },
    error => console.log(error)
    )

  }

}


