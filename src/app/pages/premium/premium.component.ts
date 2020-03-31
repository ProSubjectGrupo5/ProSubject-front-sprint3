import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ProfesorService } from 'src/app/services/services.index';

declare var paypal;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  perfil: any;
  
  constructor(private route: Router, private spinnerService: NgxSpinnerService,
    private profesorService: ProfesorService) { }

  ngOnInit() {
    this.paypal();
    this.getPerfil();
  }

  private getPerfil() {
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.perfil = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.route.navigate(['/inicio']);
    }
  }

  paypal(){
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Comprando Tarifa Premium',
                amount: {
                  currency_code: 'EUR',
                  value: 7
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          this.spinnerService.show();
          const order = await actions.order.capture();
          this.compraPremium()
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(document.getElementById('paypal'));
  }


  compraPremium() {

    this.perfil.tarifaPremium = true
    const formData: FormData = new FormData();
    formData.append('profesor', JSON.stringify(this.perfil));

    this.profesorService.editarProfesor(formData, this.perfil.id).subscribe(
      res => {
        localStorage.setItem('usuario', JSON.stringify(res));
        this.perfil = res;
        this.spinnerService.hide()
      }, err => {
        this.spinnerService.hide()
      })
  }


}
