import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { BusquedaAsignaturaService } from 'src/app/services/busqueda-asignatura/busqueda-asignatura.service';
import { GradoService, CursoService, AsignaturaService, FacultadService, EspacioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-busqueda-asignatura',
  templateUrl: './busqueda-asignatura.component.html',
  styles: []
})
export class BusquedaAsignaturaComponent implements OnInit {

  form:FormGroup;

  universidades:any[];

  grados:any[];

  cursos:any[];

  asignaturas:any[];

  facultades:any[];

  espacios:any[];

  constructor(private fb:FormBuilder,
              private busquedaAsignaturaService:BusquedaAsignaturaService,
              private cursoService:CursoService,
              private asignaturaService:AsignaturaService,
              private gradoService:GradoService,
              private facultadService:FacultadService,
              private espaciosService:EspacioService) { 
                this.espacios = [];
              }



  ngOnInit() {
    this.inicializarFormulario();
    this.busquedaAsignaturaService.getUniversidades().subscribe(data=>{
      this.universidades = data;

        this.cursoService.getCursos().subscribe(data=>{
          this.cursos = data;



        });
    });


    

  }


  inicializarFormulario(){
    this.form = this.fb.group({
      universidad: new FormControl(null),
      facultad: new FormControl({value:null, disabled:true}),
      grado: new FormControl({value:null, disabled:true}),
      curso: new FormControl(null),
      asignatura: new FormControl({value:null, disabled:true})
    });

    //VALIDACIONES
    this.form.get('universidad').setValidators(Validators.required);
    this.form.get('facultad').setValidators(Validators.required);
    this.form.get('grado').setValidators(Validators.required);
    this.form.get('curso').setValidators(Validators.required);
    this.form.get('asignatura').setValidators(Validators.required);



    //ESPERO CAMBIOS EN EL SELECT DE UNIVERSIDAD
    this.form.get('universidad').valueChanges.subscribe(data=>{

      if(data !== ''){
        this.facultadService.getFacultadesPorUniversidad(this.form.get('universidad').value).subscribe(res=>{
          if(res.length > 0){
            this.facultades = res;
            this.form.get('facultad').enable();
          }else{
            this.form.get('facultad').setValue('');
            this.form.get('facultad').disable();
            this.facultades = [];
          }
        });
      }else{
        this.form.get('facultad').setValue('');
        this.form.get('facultad').disable();
        this.facultades = [];
      }

    });


    //ESPERO CAMBIOS EN EL SELECT DE FACULTAD
    this.form.get('facultad').valueChanges.subscribe(data=>{

      if(data !== ''){
        this.gradoService.getGradosPorUniversidadYFacultad(this.form.get('universidad').value, this.form.get('facultad').value).subscribe(res=>{
          if(res.length > 0){
            this.grados = res;
            this.form.get('grado').enable();
          }else{
            this.form.get('grado').setValue('');
            this.form.get('grado').disable();
            this.grados = [];
          }
        });
      }else{
        this.form.get('grado').setValue('');
        this.form.get('grado').disable();
        this.grados = [];
      }


    });



    //ESPERO CAMBIOS EN EL SELECT DE GRADOS
    this.form.get('grado').valueChanges.subscribe(data=>{

     this.form.get('curso').setValue('');


    });


     //ESPERO CAMBIOS EN EL SELECT DE CURSO
     this.form.get('curso').valueChanges.subscribe(data=>{

      if(data !== ''){
        this.asignaturaService.getAsignaturasPorUniversidadYFacultadYGradoYCurso(this.form.get('universidad').value, this.form.get('facultad').value, this.form.get('grado').value, this.form.get('curso').value).subscribe(res=>{
          console.log(res);
          this.asignaturas = res;
          this.form.get('asignatura').enable();
          
        });
      }else{
        this.form.get('asignatura').setValue('');
        this.form.get('asignatura').disable();
        this.asignaturas = [];
        
      }


    });



  }


 
  buscar(){
    this.espaciosService.getEspaciosPorParametros(this.form.get('universidad').value, this.form.get('facultad').value,
              this.form.get('grado').value, this.form.get('curso').value,
              this.form.get('asignatura').value).subscribe(data=>{
      console.log(data);
      this.espacios = data;


    });
  }

  reset(){

    this.form.get('universidad').setValue('');
    this.form.get('facultad').setValue('');
    this.form.get('grado').setValue('');
    this.form.get('curso').setValue('');
    this.form.get('asignatura').setValue('');

    this.espacios = [];
  }

}
