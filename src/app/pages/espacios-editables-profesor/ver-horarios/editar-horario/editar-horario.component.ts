import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { validarHoras } from "../../../creacion-espacio/hour-validation";
import { validarFecha } from"../../../creacion-espacio/date-validation";

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
    horaInicio:'',
    horaFin:'',
    espacio:'',
    capacidad:'',
    fechaInicio: ''
  }

  diasSemana: any[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', "Sabado", "Domingo"]

  constructor(private fb: FormBuilder,
    private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      dia: new FormControl('', Validators.required),
      horaInicio: new FormControl('', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]),
      horaFin: new FormControl('', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]),
      capacidad: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[0-9]+$")]),
      fechaInicio: new FormControl('', [Validators.required, validarFecha])
    }, {validators: validarHoras})

    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.horarioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
        this.horarioService.getHorariosDraftMode(parseInt(paramas.get('id'), 10)).subscribe(data=>{
          this.horario = data;
          
          this.form.controls['dia'].setValue(this.horario.dia)
          this.formatearFecha(this.horario)
          this.form.controls['capacidad'].setValue(this.horario.capacidad)
          this.form.controls['fechaInicio'].setValue(this.horario.fechaInicio)

        });
      }

    });

  }

  formatearFecha(horario){
    
      let horaInicio = horario.horaInicio.split(':')
      this.form.controls['horaInicio'].setValue(horaInicio[0]+':'+horaInicio[1])

      let horaFin = horario.horaFin.split(':')
      this.form.controls['horaFin'].setValue(horaFin[0]+':'+horaFin[1])
    
  }

  convertirFecha(){
    const horaInicio = this.form.get('horaInicio').value.split(':');
    const horaFin = this.form.get('horaFin').value.split(':');
    
    let anyo=0;
    if(horaFin[0] == '00'){
      anyo = 1
    }

    this.nuevoHorario.horaInicio = new Date(2050,0,0,parseInt(horaInicio[0])+1, parseInt(horaInicio[1])).toISOString()
    this.nuevoHorario.horaFin = new Date(2050+anyo,0,0, parseInt(horaFin[0])+1, parseInt(horaFin[1])).toISOString()

}

  onSubmit(){
    
    this.nuevoHorario.id = this.horarioId
    this.nuevoHorario.dia = this.form.get('dia').value
    this.convertirFecha()
    this.nuevoHorario.capacidad = this.form.get('capacidad').value
    this.nuevoHorario.espacio = this.horario.espacio
    this.nuevoHorario.fechaInicio = this.form.get('fechaInicio').value

    this.horarioService.editarHorario(this.nuevoHorario).subscribe(
      res => this.router.navigate(['ver-horarios', this.horario.espacio.id]),
      error => console.log(error)
    )


  }

  verHorario(id){
    this.router.navigate(['ver-horarios', id])
  }

}
