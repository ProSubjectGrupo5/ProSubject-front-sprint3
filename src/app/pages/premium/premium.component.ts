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
  dias_premium: string = '';
  mensajePagado: boolean = false
  mostrarBotonPaypal: boolean = false

  constructor(private route: Router, private spinnerService: NgxSpinnerService,
    private profesorService: ProfesorService) { }

  ngOnInit() {
    this.paypal();
    this.getPerfil();
    this.mensajePagado = false
  }

  private getPerfil() {
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.perfil = JSON.parse(localStorage.getItem('usuario'));
      this.diasPremium();
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
                  value: 7.99
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          this.spinnerService.show();
          const order = await actions.order.capture();
          this.comprarPremium()
          this.mensajePagado = true
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(document.getElementById('paypal'));
  }


  comprarPremium() {
    this.profesorService.comprarPremium(this.perfil.id).subscribe(
      res => {
        localStorage.setItem('usuario', JSON.stringify(res));
        this.perfil = res;
        this.diasPremium();
        this.spinnerService.hide()
      }, err => {
        this.spinnerService.hide()
      })
  }

  diasPremium() {
    this.profesorService.diasPremium(this.perfil.id).subscribe(
      res => {
        this.dias_premium = '0';
        this.mostrarBotonPaypal = true;
      }, err => {
        const m = err['error']['mensaje'].replace(/\D/g, "");
        this.dias_premium = m;
        this.mostrarBotonPaypal = false;
      })
  }


}
