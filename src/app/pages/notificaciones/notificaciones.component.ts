import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
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

  radioOption

  constructor(private fb: FormBuilder,
    private notificacionService: NotificacionService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.form = this.fb.group({
      to: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      broadcast: new FormControl('', Validators.required)
    })

  }

  selectRadio(option){
    this.radioOption = option
  }

  esBroadcast(name){
    if(name === this.radioOption && this.radioOption == 'BROADCAST'){
      this.form.get('to').setValue('')
      this.form.get('to').clearValidators()
      this.form.get('to').updateValueAndValidity()
      return true;
    }
    this.form.get('to').setValidators(Validators.required)
    this.form.get('to').setValidators(Validators.email)

    return false;
  }

  submit(){

    if(this.form.get('broadcast').value == 1){
      this.mail.to = this.form.get('to').value
      this.mail.subject = this.form.get('subject').value
      this.mail.body = this.form.get('body').value
      this.spinnerService.show();
  
      this.notificacionService.enviarEmail(this.mail.to,
        this.mail.subject, this.mail.body).subscribe(
          res => {console.log('Mensaje enviado'),
          this.spinnerService.hide(),
          this.mensajeEnviado = true
          this.form.reset()},
          error => {
            console.log(error)
            this.spinnerService.hide()
 
          }
        )
    }else{
      this.mail.subject = this.form.get('subject').value
      this.mail.body = this.form.get('body').value
      this.spinnerService.show();

      this.notificacionService.enviarEmailBroadcast(this.mail.subject,
        this.mail.body).subscribe(
          res => {
            console.log('Mensaje enviado'),
            this.spinnerService.hide()
            this.mensajeEnviado = true
            this.form.reset()
          },
          error => {
            console.log(error)
            this.spinnerService.hide()
          }

        )

    }
    

  }

}
