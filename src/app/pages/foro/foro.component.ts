import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForoService, RespuestaService } from 'src/app/services/services.index';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  form:FormGroup;

  foro:any = {
    titulo:'',
    fechaCreacion:''
  }

  foroId:number;

  respuestas:any[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private foroService:ForoService,
    private respuestaService:RespuestaService,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.foroId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
        this.foroService.getForoPorEspacio(parseInt(paramas.get('id'), 10)).subscribe(data=>{
          this.foro = data;
          this.respuesta.foro = this.foro;

          this.respuestaService.getRespuestasPorForo(this.foroId).subscribe(data=>{
            this.respuestas = data;
            console.log(this.respuestas);
          });
        });
      }

    });

  }


  inicializarFormulario(){
    this.form = this.fb.group({
      contenido: new FormControl(''),
    });

    //VALIDACIONES
    this.form.get('contenido').setValidators(Validators.required);

  }

  
  respuesta:any = {
    contenido: '',
    user: JSON.parse(localStorage.getItem('usuario')).userAccount,
    foro: {}
  }

  insertar(){

    if(this.form.valid){

      this.respuesta.contenido = this.form.get('contenido').value;

      this.respuestaService.insertarComentario(this.respuesta).subscribe(data=>{
        console.log(data);

      });

    }


  }

}
