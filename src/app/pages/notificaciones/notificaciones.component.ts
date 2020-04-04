import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/services/services.index';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  form: FormGroup;

  mail={
    to:'',
    subject:'',
    body:''
  }

  mensajeEnviado = false

  constructor(private fb: FormBuilder,
    private notificacionService: NotificacionService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.form = this.fb.group({
      to: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    })

  }

  submit(){

    this.mail.to = this.form.get('to').value
    this.mail.subject = this.form.get('subject').value
    this.mail.body = this.form.get('body').value
    this.spinnerService.show();

    this.notificacionService.enviarEmail(this.mail.to,
      this.mail.subject, this.mail.body).subscribe(
        res => {console.log('Mensaje enviado'),
        this.spinnerService.hide(),
        this.mensajeEnviado = true},
        error => console.log(error)
      )

  }

}
