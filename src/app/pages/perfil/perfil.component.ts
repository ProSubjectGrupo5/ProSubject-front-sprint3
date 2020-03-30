import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { confirmPasswordValidator } from '../registro/confirm-password-validator';
import { AlumnoService, ProfesorService, FileService, AdminService } from 'src/app/services/services.index';
import { saveAs } from "file-saver";
import { validDNIValidator } from "../registro/dni-validator";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: any;
  editarPerfil: boolean;
  mostrarMensajeActualizarPerfil: boolean;
  error: string;
  fileToUpload: File = null;

  form:FormGroup;
  usuario: any = {
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',
    expendiente: {
      id:'',
      fileName:'',
      fileType:'',
      data:''
    },
    userAccount: {
      id:'',
      username:'',
      password:'',
      autoridad:''
    },
    tarifaPremium:'',
    expedienteValidado:''
  }


  constructor(private route: Router, private fb:FormBuilder,
    private alumnoService: AlumnoService, private profesorService: ProfesorService,
    private fileService: FileService, private adminService: AdminService) { }

  ngOnInit() {
    this.getPerfil();
    this.editarPerfil = false;
    this.mostrarMensajeActualizarPerfil = false;
    this.error = null;

    this.form = this.fb.group({
      nombre: new FormControl(this.perfil.nombre, [Validators.required]),
      apellido1: new FormControl(this.perfil.apellido1, [Validators.required]),
      apellido2: new FormControl(this.perfil.apellido2, [Validators.required]),
      dni: new FormControl(this.perfil.dni, [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]{1}$'), validDNIValidator]),
      email: new FormControl(this.perfil.email, [Validators.required, Validators.email]),
      telefono: new FormControl(this.perfil.telefono, [Validators.pattern('^[0-9]{9}$')]),
      useraccount: new FormGroup({
        username: new FormControl(this.perfil.userAccount.username, [Validators.required]),
        password: new FormControl(this.perfil.userAccount.password, [Validators.required]),
        confirmPassword: new FormControl(this.perfil.userAccount.password),
      }, {validators: confirmPasswordValidator})
    })
  }

  private getPerfil() {
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.perfil = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.route.navigate(['/inicio']);
    }
  }

  public mostrarFormularioEditarPerfil() {
    this.editarPerfil = !this.editarPerfil;
    this.mostrarMensajeActualizarPerfil = false;
  }

  
  onSubmit(){
    if(!this.fileToUpload && this.perfil.userAccount.autoridad === 'PROFESOR') {
      this.usuario.expendiente = this.perfil['expendiente']
    } else if(this.fileToUpload && this.perfil.userAccount.autoridad === 'PROFESOR') {
      this.usuario.expendiente = this.perfil['expendiente']
      this.usuario.expendiente.id = -1
    }
    this.usuario.id = this.perfil.id;
    this.usuario.nombre = this.form.get('nombre').value;
    this.usuario.apellido1 = this.form.get('apellido1').value;
    this.usuario.apellido2 = this.form.get('apellido2').value;
    this.usuario.dni = this.form.get('dni').value;
    this.usuario.email = this.form.get('email').value;
    this.usuario.telefono = this.form.get('telefono').value;
    this.usuario.userAccount.id = this.perfil.userAccount.id
    this.usuario.userAccount.username = this.form.get('useraccount').get('username').value;
    this.usuario.userAccount.password = this.form.get('useraccount').get('password').value;
    this.usuario.userAccount.autoridad = this.perfil.userAccount.autoridad;
    this.usuario.expedienteValidado = this.perfil.expedienteValidado
    this.usuario.tarifaPremium = this.perfil.tarifaPremium

    if(this.perfil.userAccount.autoridad === 'ADMIN') {
      this.adminService.editarAdmin(this.usuario, this.perfil.id).subscribe(
        res => {
          this.editarPerfil=false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
          this.mostrarMensajeActualizarPerfil = true;
        });

    } else if(this.perfil.userAccount.autoridad === 'ALUMNO'){
      this.alumnoService.editarAlumno(this.usuario, this.perfil.id).subscribe(
        res => {
          this.editarPerfil=false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
          this.mostrarMensajeActualizarPerfil = true;
        });
    }else{
      const formData: FormData = new FormData();
      formData.append('profesor', JSON.stringify(this.usuario));
      if(this.fileToUpload) {
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
      }

      this.profesorService.editarProfesor(formData, this.perfil.id).subscribe(
        res => {
          this.editarPerfil = false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
          this.mostrarMensajeActualizarPerfil = true;
        },
        error =>{
          this.error = error.error.mensaje;
        })
    }
  }


  fileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  download(id){
    var fichero: any;
    this.fileService.getFile(id).subscribe(res =>{
      fichero = res;
      this.fileService.downloadFile(fichero.id).subscribe(
        res => {
          saveAs(res , fichero.fileName)
        }
      )
    },
    error => console.log(error)
    )
  }
}
