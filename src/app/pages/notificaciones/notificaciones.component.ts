import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/services/services.index';

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

  constructor(private fb: FormBuilder,
    private notificacionService: NotificacionService) { }

  ngOnInit() {

    this.form = this.fb.group({
      to: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    })

  }

  submit(){

    this.mail.to = this.form.get('to').value
    this.mail.subject = this.form.get('subject').value
    this.mail.body = this.form.get('body').value

    this.notificacionService.enviarEmail(this.mail.to,
      this.mail.subject, this.mail.body).subscribe(
        res => {console.log('Mensaje enviado')},
        error => console.log(error)
      )

  }

}
