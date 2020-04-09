import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { BusquedaAsignaturaService } from 'src/app/services/busqueda-asignatura/busqueda-asignatura.service';
import { GradoService, CursoService, AsignaturaService, FacultadService, EspacioService, BreadcrumbsService } from 'src/app/services/services.index';

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
              private espaciosService:EspacioService,
              private breadcrumbsService: BreadcrumbsService) { 
                this.espacios = [];
              }



  ngOnInit() {
    console.log(this.breadcrumbsService.usuario);
    this.inicializarFormulario(this.breadcrumbsService.usuario);
    this.busquedaAsignaturaService.getUniversidades().subscribe(data=>{
      this.universidades = data;
    });
  }


  inicializarFormulario(usuario:any){

    if(usuario === null){
      this.form = this.fb.group({
        universidad: new FormControl(null),
        facultad: new FormControl(null),
        grado: new FormControl(null),
        curso: new FormControl(null),
        asignatura: new FormControl(null)
      });

    }else{
      this.form = this.fb.group({
        universidad: new FormControl(usuario.universidad.nombre),
        facultad: new FormControl(usuario.facultad.nombre),
        grado: new FormControl(usuario.grado.nombre),
        curso: new FormControl(null),
        asignatura: new FormControl(null)
      });

      this.facultadService.getFacultadesPorUniversidad(this.form.get('universidad').value).subscribe(res=>{
        this.facultades = res;
        this.gradoService.getGradosPorUniversidadYFacultad(this.form.get('universidad').value, this.form.get('facultad').value).subscribe(res=>{
          this.grados = res;
          this.cursoService.getCursosPorGrado(this.form.get('grado').value).subscribe(res=>{
            this.cursos = res;
          });
        });
      });
    }
    

    //VALIDACIONES
    this.form.get('universidad').setValidators(Validators.required);
    this.form.get('facultad').setValidators(Validators.required);
    this.form.get('grado').setValidators(Validators.required);
    this.form.get('curso').setValidators(Validators.required);
    this.form.get('asignatura').setValidators(Validators.required);



    //ESPERO CAMBIOS EN EL SELECT DE UNIVERSIDAD
    this.form.get('universidad').valueChanges.subscribe(data=>{

      if(data !== null && data !== ''){
        this.facultadService.getFacultadesPorUniversidad(this.form.get('universidad').value).subscribe(res=>{
          if(res.length > 0){
            console.log(res);
            this.facultades = res;
            //this.form.get('facultad').enable();
          }else{
            console.log(res);
            this.form.get('facultad').setValue(null);
            //this.form.get('facultad').disable();
            this.facultades = [];
          }
        });
      }else{
        this.form.get('facultad').setValue(null);
        //this.form.get('facultad').disable();
        this.facultades = [];
      }

    });


    //ESPERO CAMBIOS EN EL SELECT DE FACULTAD
    this.form.get('facultad').valueChanges.subscribe(data=>{

      if(data !== null && data !== ''){
        this.gradoService.getGradosPorUniversidadYFacultad(this.form.get('universidad').value, this.form.get('facultad').value).subscribe(res=>{
          if(res.length > 0){
            this.grados = res;
            //this.form.get('grado').enable();
          }else{
            this.form.get('grado').setValue(null);
            //this.form.get('grado').disable();
            this.grados = [];
          }
        });
      }else{
        this.form.get('grado').setValue(null);
        //this.form.get('grado').disable();
        this.grados = [];
      }


    });

      

    this.form.get('grado').valueChanges.subscribe(data=>{
        if(data !== null && data !== ''){
          this.cursoService.getCursosPorGrado(this.form.get('grado').value).subscribe(res=>{
            if(res.length > 0){
              this.cursos = res;
              //this.form.get('curso').enable();
            }else{
              this.form.get('curso').setValue(null);
              //this.form.get('curso').disable();
              this.cursos = [];
            }
          });
        }else{
          this.form.get('curso').setValue(null);
          //this.form.get('curso').disable();
          this.cursos = [];
        }
    });

    
    this.form.get('curso').valueChanges.subscribe(data=>{

        if(data !== null && data !== ''){
          this.asignaturaService.getAsignaturasPorUniversidadYFacultadYGradoYCurso(this.form.get('universidad').value, this.form.get('facultad').value, this.form.get('grado').value, this.form.get('curso').value).subscribe(res=>{
            if(res.length > 0){ 
              console.log(res);
              this.asignaturas = res;
              //this.form.get('asignatura').enable(); 
            }else{
              console.log(res);
              this.form.get('asignatura').setValue(null);
              //this.form.get('asignatura').disable();
              this.asignaturas = [];
            }
            
          });
        }else{
          this.form.get('asignatura').setValue(null);
          //this.form.get('asignatura').disable();
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
    if(this.breadcrumbsService.usuario === null){
      this.form.get('universidad').setValue(null);
      this.form.get('facultad').setValue(null);
      this.form.get('grado').setValue(null);
      this.form.get('curso').setValue(null);
      this.form.get('asignatura').setValue(null);
      this.espacios = [];
    }else{
      this.form.get('curso').setValue(null);
      this.form.get('asignatura').setValue(null);
      this.espacios = [];
    }

  }
    

    

   

}
