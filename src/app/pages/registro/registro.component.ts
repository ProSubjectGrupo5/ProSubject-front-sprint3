import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { confirmPasswordValidator } from "./confirm-password-validator";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form:FormGroup;

  usuario: any = {
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',
    useraccount: {
      username:'',
      password:'',
      autoridad:''
    }
  }

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]{1}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      useraccount: new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl(''),
        autoridad: new FormControl('', Validators.required)
      }, {validators: confirmPasswordValidator})
    })
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
