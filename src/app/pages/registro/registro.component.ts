import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { confirmPasswordValidator } from "./confirm-password-validator";
import { validDNIValidator } from "./dni-validator";
import { AlumnoService, ProfesorService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file/file.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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

    userAccount: {
      username:'',
      password:'',
      autoridad:''
    }
  }

  constructor(private fb:FormBuilder,
    private alumnoService: AlumnoService,
    private profesorService: ProfesorService,
    private fileService: FileService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]{1}$'), validDNIValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
      file: new FormControl(''),
      useraccount: new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl(''),
        autoridad: new FormControl('', Validators.required)
      }, {validators: confirmPasswordValidator})
    })
  }

  onSubmit(){

    //crear usuario
    this.usuario.nombre = this.form.get('nombre').value;
    this.usuario.apellido1 = this.form.get('apellido1').value;
    this.usuario.apellido2 = this.form.get('apellido2').value;
    this.usuario.dni = this.form.get('dni').value;
    this.usuario.email = this.form.get('email').value;
    this.usuario.telefono = this.form.get('telefono').value;
    this.usuario.userAccount.username = this.form.get('useraccount').get('username').value;
    this.usuario.userAccount.password = this.form.get('useraccount').get('password').value;
    this.usuario.userAccount.autoridad = this.form.get('useraccount').get('autoridad').value;

    
    if(this.form.get('useraccount').get('autoridad').value == 'ALUMNO'){
      this.alumnoService.registrarAlumno(this.usuario).subscribe(
        res => this.router.navigate(['inicio']),
        error => console.log(error)
      )
    }else{

      var formData = new FormData();
      formData.append('file', this.fileUpload, this.fileUpload.name)
      this.fileService.uploadFile(formData).subscribe(
        res => {console.log(res),

          this.profesorService.registrarProfesor(this.usuario).subscribe(
          res => this.router.navigate(['inicio']),
          error => console.log(error)
          )
          
        },
        error => console.log(error)
      )
      
      
      

      
    }
  
    

  }

  fileInput(files: FileList){
    this.fileUpload = files.item(0);
  }

  selectRadio(e){
    this.selectRadioButton = e
  }

  esProfesor(name){
    if(name == this.selectRadioButton){
      return true;
    }
    return false;
  }

}
