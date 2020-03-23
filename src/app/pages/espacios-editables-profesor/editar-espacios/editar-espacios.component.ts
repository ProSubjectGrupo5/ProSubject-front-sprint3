import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EspacioService, BusquedaAsignaturaService, CursoService, FacultadService, GradoService, AsignaturaService } from 'src/app/services/services.index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-espacios',
  templateUrl: './editar-espacios.component.html',
  styleUrls: ['./editar-espacios.component.css']
})
export class EditarEspaciosComponent implements OnInit {

  form: FormGroup;

  espacio: any
  espacioId: number

  universidades: any[];
  facultades: any[];
  grados: any[];
  cursos: any[];
  asignaturas: any[];

  nuevoEspacio: any = {
    id:'',
    asignatura: '',
    foro: '',
    profesor: '',
    precio: '',
    draftMode: ''
  }

  constructor(private fb: FormBuilder,
    private busquedaAsignaturaService: BusquedaAsignaturaService,
    private facultadService: FacultadService,
    private gradoService: GradoService,
    private cursoService: CursoService,
    private asignaturaService: AsignaturaService,
    private espacioService: EspacioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      universidad: new FormControl('', Validators.required),
      facultades: new FormControl('', Validators.required),
      grado: new FormControl('', Validators.required),
      curso: new FormControl('', Validators.required),
      asignatura: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]{1,}(\\.[0-9]{1,2})?$')]),
      draftMode: new FormControl('')
    })

    this.activatedRoute.paramMap.subscribe(paramas=>{
      this.espacioId = parseInt(paramas.get('id'), 10);
      if(paramas.has('id')){
        this.espacioService.getEspaciosPorId(parseInt(paramas.get('id'), 10)).subscribe(
          data=>{
          this.espacio = data
          console.log(this.espacio)

          this.busquedaAsignaturaService.getUniversidades().subscribe(data=>{
            this.universidades = data;

            this.facultadService.getFacultadesPorUniversidad(this.espacio.asignatura.grados[0].facultad.universidad.nombre).subscribe(
              data => {this.facultades = data

                this.gradoService.getGradosPorUniversidadYFacultad(this.espacio.asignatura.grados[0].facultad.universidad.nombre,
                  this.espacio.asignatura.grados[0].facultad.nombre).subscribe(data =>{
                    this.grados = data

                      this.cursoService.getCursos().subscribe(data=>{
                        this.cursos = data;

                        this.asignaturaService.getAsignaturasPorUniversidadYFacultadYGradoYCurso(
                          this.espacio.asignatura.grados[0].facultad.universidad.nombre, 
                          this.espacio.asignatura.grados[0].facultad.nombre,
                          this.espacio.asignatura.grados[0].nombre,
                          this.espacio.asignatura.curso.nombre
                        ).subscribe(
                          data => {
                            this.asignaturas = data;
                          }
                        )

                      });
                  })
            });
          });

          this.form.controls['universidad'].setValue(this.espacio.asignatura.grados[0].facultad.universidad.nombre)
          this.form.controls['facultades'].setValue(this.espacio.asignatura.grados[0].facultad.nombre)
          this.form.controls['grado'].setValue(this.espacio.asignatura.grados[0].nombre)
          this.form.controls['curso'].setValue(this.espacio.asignatura.curso.nombre)
          this.form.controls['asignatura'].setValue(this.espacio.asignatura.id)
          this.form.controls['precio'].setValue(this.espacio.precio)
          this.form.controls['draftMode'].setValue(this.espacio.draftMode)

          
        });
      }

    });


    //SELECTS
    this.form.get('universidad').valueChanges.subscribe(data=>{

      if(data !== ''){
        this.facultadService.getFacultadesPorUniversidad(this.form.get('universidad').value).subscribe(res=>{
          this.facultades = res;
        });
      }else{
        this.form.get('facultad').setValue('');
        this.facultades = [];
      }

    });

    this.form.get('facultades').valueChanges.subscribe(data=>{

      if(data !== ''){
        this.gradoService.getGradosPorUniversidadYFacultad(this.form.get('universidad').value, this.form.get('facultades').value).subscribe(res=>{
          this.grados = res;
        });
      }else{
        this.form.get('grado').setValue('');
        this.grados = [];
      }

    });

    this.form.get('curso').valueChanges.subscribe(data=>{

      if(data !== ''){
        this.asignaturaService.getAsignaturasPorUniversidadYFacultadYGradoYCurso(this.form.get('universidad').value, this.form.get('facultades').value, this.form.get('grado').value, this.form.get('curso').value).subscribe(res=>{
          this.asignaturas = res;
        });
      }else{
        this.form.get('asignaturas').setValue('');
        this.asignaturas = [];
      }

    });


  }

  volverEspaciosEditables(){
    this.router.navigate(['espacios-editable-profesor'])
  }

  onSubmit(){
    

    this.asignaturaService.getAsignaturaPorId(this.form.get('asignatura').value).subscribe(
      res =>{
        this.nuevoEspacio.asignatura = res;

        this.nuevoEspacio.id = this.espacioId;
        this.nuevoEspacio.foro = this.espacio.foro;
        this.nuevoEspacio.profesor = this.espacio.profesor;
        this.nuevoEspacio.precio = this.form.get('precio').value;
        this.nuevoEspacio.draftMode = this.form.get('draftMode').value;

        this.espacioService.editarEspacio(this.nuevoEspacio).subscribe(
          res => {
            this.router.navigate(['espacios-editable-profesor'])
          },
          error => console.log(error)
        )

      },
      error => console.log(error)
    )
  }
}
