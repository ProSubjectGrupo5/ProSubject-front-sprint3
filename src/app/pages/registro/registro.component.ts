import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { confirmPasswordValidator } from "./confirm-password-validator";
import { validDNIValidator } from "./dni-validator";
import { AlumnoService, ProfesorService, ValidadoresService, FacultadService, BusquedaAsignaturaService, GradoService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file/file.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  universidades:any[];
  grados:any[];
  facultades:any[];

  form:FormGroup;

  fileUpload: File = null;

  selectRadioButton: '';

  usuario: any = {
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',

    //Atributos profesor
    tarifaPremium:'false',
    expedienteValidado: 'PENDIENTE',
    //---Atributos profesor---

    //Atributos profesor
    universidad:'',
    facultad: '',
    grado: '',
    //---Atributos profesor---

    userAccount: {
      username:'',
      password:'',
      autoridad:''
    }
  }

  constructor(private fb:FormBuilder,
    private alumnoService: AlumnoService,
    private profesorService: ProfesorService,
    private router: Router,
    private validadoresService:ValidadoresService,
    private facultadService:FacultadService,
    private busquedaAsignaturaService:BusquedaAsignaturaService,
    private gradoService:GradoService) { }

  ngOnInit() {
    this.inicializarFormulario();

    this.busquedaAsignaturaService.getUniversidades().subscribe(
      data => this.universidades = data
    )
    
  }
    



  inicializarFormulario(){
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]{1}$'), validDNIValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
      file: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
      autoridad: new FormControl('', Validators.required),
      check: new FormControl(false)
    },{validators: this.validadoresService.passwordsIguales('password','confirmPassword')});
  
    
  }

  onSubmit(){

    //crear usuario
    this.usuario.nombre = this.form.get('nombre').value;
    this.usuario.apellido1 = this.form.get('apellido1').value;
    this.usuario.apellido2 = this.form.get('apellido2').value;
    this.usuario.dni = this.form.get('dni').value;
    this.usuario.email = this.form.get('email').value;
    this.usuario.telefono = this.form.get('telefono').value;
    this.usuario.userAccount.username = this.form.get('username').value;
    this.usuario.userAccount.password = this.form.get('password').value;
    this.usuario.userAccount.autoridad = this.form.get('autoridad').value;

    
    if(this.form.get('autoridad').value == 'ALUMNO'){

      this.busquedaAsignaturaService.getIdUniversidad(this.form.get('universidad').value).subscribe(
        data => {
          this.busquedaAsignaturaService.getUniversidadPorId(data).subscribe(
            data => {
              this.usuario.universidad = data
              
              this.facultadService.getIdFacultad(this.form.get('facultades').value).subscribe(
                data => {
                  this.facultadService.getFacultadPorId(data).subscribe(
                    data => {
                      this.usuario.facultad = data
                      
                      this.gradoService.getIdGrado(this.form.get('grado').value).subscribe(
                        idGrado => {
                          this.gradoService.getGradoPorId(idGrado).subscribe(
                            data => {
                              this.usuario.grado = data

                              this.alumnoService.registrarAlumno(this.usuario).subscribe(
                                      res => this.router.navigate(['login']),
                                      error => console.log(error)
                                    )
                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      )
      
    }else{
      delete this.usuario.universidad
      delete this.usuario.facultad
      delete this.usuario.grado

      var formData = new FormData();
      formData.append('profesor', JSON.stringify(this.usuario))
      formData.append('file', this.fileUpload, this.fileUpload.name)

      this.profesorService.registrarProfesor(formData).subscribe(
        res => this.router.navigate(['login']),
        error => console.log(error)
      )
          
    }

  }

  fileInput(files: FileList){
    this.fileUpload = files.item(0);
  }

  selectRadio(autoridad){
    this.selectRadioButton = autoridad
  }

  esProfesor(name){
    if(name === this.selectRadioButton){
      this.form.get('file').setValidators(Validators.required);
      return true;
    }
    this.form.get('file').setValue('')
    this.form.get('file').clearValidators()
    this.form.get('file').updateValueAndValidity()
    return false;
  }

  esAlumno(name){
    if(name === this.selectRadioButton){
      this.form.addControl('universidad', new FormControl('', Validators.required))
      this.form.addControl('facultades', new FormControl('', Validators.required))
      this.form.addControl('grado', new FormControl('', Validators.required))

      this.form.get('universidad').valueChanges.subscribe(data=>{
        console.log(data)
        if(data !== ''){
          this.facultadService.getFacultadesPorUniversidad(this.form.get('universidad').value).subscribe(res=>{
            this.facultades = res;
          });
        }else{
          this.form.get('facultad').setValue('');
          this.facultades = [];
        }
  
      });
  
      //CAMBIO EN EL SELECT DE FACULTAD
      this.form.get('facultades').valueChanges.subscribe(data=>{
  
        if(data !== ''){
          this.gradoService.getGradosPorUniversidadYFacultad(this.form.get('universidad').value, this.form.get('facultades').value).subscribe(res=>{
            this.grados = res;
          });
        }else{
          this.form.get('grado').setValue('');
          this.grados = [];
        }
  
      });

      return true;
    }
  }


  

}
