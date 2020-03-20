import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      useraccount: new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        autoridad: new FormControl('')
      })
    })
  }

}
