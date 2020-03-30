import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdminService, ValidadoresService } from 'src/app/services/services.index';
import { validDNIValidator } from "../registro/dni-validator";

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styles: []
})
export class NuevoAdminComponent implements OnInit {


  form:FormGroup;

  
  constructor(private fb:FormBuilder, private administradorService:AdminService, private validadoresService:ValidadoresService) { }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.form = this.fb.group({
      nombre: new FormControl(''),
      apellido1: new FormControl(''),
      apellido2: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      username: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl('')
    },{
      validators: this.validadoresService.passwordsIguales('password1','password2')
    });

    //VALIDACIONES
    
    this.form.get('nombre').setValidators(Validators.required);
    this.form.get('apellido1').setValidators(Validators.required);
    this.form.get('apellido2').setValidators(Validators.required);
    this.form.get('dni').setValidators([Validators.required, Validators.pattern('[0-9]{8}[A-Z]{1}'), validDNIValidator]);
    this.form.get('email').setValidators([Validators.required, Validators.email]);
    this.form.get('telefono').setValidators(Validators.pattern('[0-9]{9}'));
    this.form.get('username').setValidators(Validators.required);
    this.form.get('password1').setValidators(Validators.required);
    this.form.get('password2').setValidators(Validators.required);
    
  }

  

  administrador: any = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    email: '',
    telefono: '',
    userAccount: {}
  };

  userAccount: any = {
    password: '',
    autoridad: '',
    username: ''
  };

  insertar(){

    if(this.form.valid){

      this.administrador.nombre = this.form.get('nombre').value;
      this.administrador.apellido1 = this.form.get('apellido1').value;
      this.administrador.apellido2 = this.form.get('apellido2').value;
      this.administrador.dni = this.form.get('dni').value;
      this.administrador.email = this.form.get('email').value;
      this.administrador.telefono = this.form.get('telefono').value;
      this.administrador.apellido1 = this.form.get('apellido1').value;

      this.userAccount.password = this.form.get('password1').value;
      this.userAccount.autoridad = 'ADMIN';
      this.userAccount.username = this.form.get('username').value;

      this.administrador.userAccount = this.userAccount;

      this.administradorService.crearAdmin(this.administrador).subscribe(data=>{
        console.log(data);
      });

    }
  }


    

     

}
