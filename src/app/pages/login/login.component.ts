import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/services.index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder, private loginService: LoginService, private route:Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required)
    });
  }

  //REALIZA LA ACCIÓN DEL LOGIN
  signIn(){
    this.loginService.login(this.form.get('usuario').value, this.form.get('contraseña').value).subscribe(user=>{
      this.loginService.usuarioLogueado = user;
      console.log(this.loginService.usuarioLogueado);
      localStorage.setItem('usuario', JSON.stringify(this.loginService.usuarioLogueado));
      if(localStorage.getItem('carrito')){
        this.route.navigate(['carrito']);
      } else {
        this.route.navigate(['inicio']);
      }   
    });

  }

}
