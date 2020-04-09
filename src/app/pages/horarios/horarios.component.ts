import { Component, OnInit, ViewChild, ElementRef, AfterContentInit} from '@angular/core';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService, AlumnoService, CarritoService } from 'src/app/services/services.index';

//declare var paypal;

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit, AfterContentInit{

  
  //@ViewChild('paypal', { static: true }) paypalElement: ElementRef;


  /*
  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };
  */
  

  //paidFor = false;



  horarios: any[]
  alumnosInscritos = new Map();
  espacioId:number
  mostrarMensaje: boolean = false;

  constructor(private horarioService: HorarioService,
    private alumnoService: AlumnoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public loginService: LoginService,
    private carritoService: CarritoService) {

     
     }

  ngOnInit() {
    this.mostrarMensaje=false;
    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.espacioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
          this.horarioService.getHorariosDeEspacio(this.espacioId).subscribe(
            res => {
            
              this.horarios = res;
              this.formatearHora();

              this.horarios.forEach(element => { 

                this.alumnoService.getNumeroAlumnosPorHorario(element.id).subscribe(data =>{
                  this.alumnosInscritos.set(element.id ,data);
                  //this.paypal();

                });

            });

          });  

      }

    });
 
  }

  ngAfterContentInit(){

  }

  /*
  paypal(){

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'EUR',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          //this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(document.getElementById('paypal'));

  }
  */

  

  formatearHora(){
    this.horarios.forEach(element => {
      let horaInicio = element.horaInicio.split(':');
      element.horaInicio = horaInicio[0]+':'+horaInicio[1]

      let horaFin = element.horaFin.split(':');
      element.horaFin = horaFin[0]+':'+horaFin[1]
    })
  }

  volverDetallesEspacio(id){
    this.router.navigate(['detalles-espacio', id])
  }


  addHorario(idHorario: string) {
    if(JSON.parse(localStorage.getItem('usuario'))){
      var carrito: any;
      this.mostrarMensaje=false;
      this.carritoService.getCarritoPorIdAlumno(JSON.parse(localStorage.getItem('usuario')).id).subscribe(
        res => {
          carrito = res
          this.carritoService.addHorarioCarrito(carrito.id, idHorario).subscribe(
            res => {
              this.mostrarMensaje=true;
            })
        })
    } else {
      localStorage.setItem('carrito', idHorario)
      this.router.navigate(['login'])
    }
  }

}
