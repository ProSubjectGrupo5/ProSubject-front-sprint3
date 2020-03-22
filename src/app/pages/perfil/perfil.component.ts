import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { confirmPasswordValidator } from '../registro/confirm-password-validator';
import { AlumnoService, ProfesorService } from 'src/app/services/services.index';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: any;
  editarPerfil: boolean;

  form:FormGroup;
  usuario: any = {
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',

    userAccount: {
      username:'',
      password:'',
      autoridad:''
    }
  }


  constructor(private route: Router, private fb:FormBuilder,
    private alumnoService: AlumnoService, private profesorService: ProfesorService) { }

  ngOnInit() {
    this.getPerfil();
    this.editarPerfil = false;

    this.form = this.fb.group({
      nombre: new FormControl(this.perfil.nombre, [Validators.required]),
      apellido1: new FormControl(this.perfil.apellido1, [Validators.required]),
      apellido2: new FormControl(this.perfil.apellido2, [Validators.required]),
      dni: new FormControl(this.perfil.dni, [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]{1}$')]),
      email: new FormControl(this.perfil.email, [Validators.required, Validators.email]),
      telefono: new FormControl(this.perfil.telefono, [Validators.required]),
      file: new FormControl(''),
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
  }

  
  onSubmit(){
    this.usuario.id = this.perfil.id;
    this.usuario.nombre = this.form.get('nombre').value;
    this.usuario.apellido1 = this.form.get('apellido1').value;
    this.usuario.apellido2 = this.form.get('apellido2').value;
    this.usuario.dni = this.form.get('dni').value;
    this.usuario.email = this.form.get('email').value;
    this.usuario.telefono = this.form.get('telefono').value;
    this.usuario.userAccount.username = this.form.get('useraccount').get('username').value;
    this.usuario.userAccount.password = this.form.get('useraccount').get('password').value;
    this.usuario.userAccount.autoridad = this.perfil.userAccount.autoridad;

    if(this.perfil.userAccount.autoridad === 'ALUMNO'){
      this.alumnoService.editarAlumno(this.usuario, this.perfil.id).subscribe(
        res => {
          this.editarPerfil=false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
        },
        error => console.log(error)
      )
    }else{
      this.profesorService.editarProfesor(this.usuario, this.perfil.id).subscribe(
        res => {
          this.editarPerfil=false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
        },
        error => console.log(error))
    }
  }

}
