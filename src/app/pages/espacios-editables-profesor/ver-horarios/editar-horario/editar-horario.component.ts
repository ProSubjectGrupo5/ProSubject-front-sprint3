import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { validarHoras } from "../../../creacion-espacio/hour-validation";

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css']
})
export class EditarHorarioComponent implements OnInit {

  horario: any;

  horarioId: number;

  form: FormGroup;

  nuevoHorario:any = { 
    id:'',
    dia:'',
    fechaInicio:'',
    fechaFin:'',
    espacio:'',
    capacidad:'',
    alumnos: []
  }

  diasSemana: any[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', "Sabado", "Domingo"]

  constructor(private fb: FormBuilder,
    private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      dia: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]),
      fechaFin: new FormControl('', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]),
      capacidad: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+$")])
    }, {validators: validarHoras})

    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.horarioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
        this.horarioService.getHorarioPorId(parseInt(paramas.get('id'), 10)).subscribe(data=>{
          this.horario = data;
          
          this.form.controls['dia'].setValue(this.horario.dia)
          this.formatearFecha(this.horario)
          this.form.controls['capacidad'].setValue(this.horario.capacidad)

        });
      }

    });

  }

  formatearFecha(horario){
    
      let horaInicio = horario.fechaInicio.split(':')
      this.form.controls['fechaInicio'].setValue(horaInicio[0]+':'+horaInicio[1])

      let horaFin = horario.fechaFin.split(':')
      this.form.controls['fechaFin'].setValue(horaFin[0]+':'+horaFin[1])
    
  }

  convertirFecha(){
    const horaInicio = this.form.get('fechaInicio').value.split(':');
    const horaFin = this.form.get('fechaFin').value.split(':');
    
    let anyo=0;
    if(horaFin[0] == '00'){
      anyo = 1
    }

    this.nuevoHorario.fechaInicio = new Date(2050,0,0,parseInt(horaInicio[0]), parseInt(horaInicio[1])).toISOString()
    this.nuevoHorario.fechaFin = new Date(2050+anyo,0,0, parseInt(horaFin[0]), parseInt(horaFin[1])).toISOString()

}

  onSubmit(){
    
    this.nuevoHorario.id = this.horarioId
    this.nuevoHorario.dia = this.form.get('dia').value
    this.convertirFecha()
    this.nuevoHorario.capacidad = this.form.get('capacidad').value
    this.nuevoHorario.espacio = this.horario.espacio

    this.horarioService.editarHorario(this.nuevoHorario).subscribe(
      res => this.router.navigate(['ver-horarios', this.horario.espacio.id]),
      error => console.log(error)
    )


  }

  verHorario(id){
    this.router.navigate(['ver-horarios', id])
  }

}
