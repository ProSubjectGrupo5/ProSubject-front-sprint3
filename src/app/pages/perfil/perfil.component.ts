import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { confirmPasswordValidator } from '../registro/confirm-password-validator';
import { AlumnoService, ProfesorService, FileService, AdminService, BusquedaAsignaturaService, FacultadService, GradoService } from 'src/app/services/services.index';
import { saveAs } from "file-saver";
import { validDNIValidator } from "../registro/dni-validator";
import swal from 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  universidades:any[];
  grados:any[];
  facultades:any[];

  perfil: any;
  editarPerfil: boolean;
  mostrarMensajeActualizarPerfil: boolean;
  error: string;
  fileToUpload: File = null;

  form:FormGroup;

  admin: any = {
    id:'',
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',
    userAccount: {
      id:'',
      username:'',
      password:'',
      autoridad:''
    }
  }

  profesor: any = {
    id:'',
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',
    tarifaPremium:'',
    expendiente: {
      id:'',
      fileName:'',
      fileType:'',
      data:''
    },
    expedienteValidado:'',
    valoracionMedia: '',
    fechaPagoPremium:'',
    userAccount: {
      id:'',
      username:'',
      password:'',
      autoridad:''
    }
  }

  alumno: any = {
    id: '',
    nombre:'',
    apellido1:'',
    apellido2:'',
    dni:'',
    email:'',
    telefono:'',
    userAccount: {
      id:'',
      username:'',
      password:'',
      autoridad:''
    },
    universidad: {
      id:'',
      nombre:'',
    },
    grado: {
      id:'',
      nombre:'',
      facultad:'',
      numerocursos:''
    },
    facultad: {
      id:'',
      nombre:'',
      universidad:'',
    },
    contadorDescuento:''
  }


  constructor(private route: Router, private fb:FormBuilder,
    private alumnoService: AlumnoService, private profesorService: ProfesorService,
    private fileService: FileService, private adminService: AdminService,
    private facultadService:FacultadService,
    private busquedaAsignaturaService:BusquedaAsignaturaService,
    private gradoService:GradoService) { }

  ngOnInit() {
    this.getPerfil();
    this.editarPerfil = false;
    this.mostrarMensajeActualizarPerfil = false;
    this.error = null;

    this.form = this.fb.group({
      nombre: new FormControl(this.perfil.nombre, [Validators.required]),
      apellido1: new FormControl(this.perfil.apellido1, [Validators.required]),
      apellido2: new FormControl(this.perfil.apellido2, [Validators.required]),
      dni: new FormControl(this.perfil.dni, [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]{1}$'), validDNIValidator]),
      email: new FormControl(this.perfil.email, [Validators.required, Validators.email]),
      telefono: new FormControl(this.perfil.telefono, [Validators.pattern('^[0-9]{9}$')]),
      useraccount: new FormGroup({
        username: new FormControl(this.perfil.userAccount.username, [Validators.required]),
        password: new FormControl(this.perfil.userAccount.password, [Validators.required]),
        confirmPassword: new FormControl(this.perfil.userAccount.password),
      }, {validators: confirmPasswordValidator})
    })
    if(this.perfil.userAccount.autoridad === 'ALUMNO') {
      this.form.addControl('universidad', new FormControl(this.perfil.universidad.nombre, [Validators.required]));
      this.form.addControl('facultad', new FormControl(this.perfil.facultad.nombre, [Validators.required]));
      this.form.addControl('grado', new FormControl(this.perfil.grado.nombre, [Validators.required]));
      this.busquedaAsignaturaService.getUniversidades().subscribe(
        data => this.universidades = data
      )
    }
  }

  private getPerfil() {
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.perfil = JSON.parse(localStorage.getItem('usuario'));
      if(this.perfil.userAccount.autoridad === 'ALUMNO') {
        this.facultadService.getFacultadesPorUniversidad(this.perfil.universidad.nombre).subscribe(
          data => this.facultades = data
        )
        this.gradoService.getGradosPorUniversidadYFacultad(this.perfil.universidad.nombre,this.perfil.facultad.nombre).subscribe(
          data => this.grados = data
        )
      }
    }else{
      this.route.navigate(['/inicio']);
    }
  }

  public mostrarFormularioEditarPerfil() {
    this.editarPerfil = !this.editarPerfil;
    this.mostrarMensajeActualizarPerfil = false;
    this.error = null
  }

  
  onSubmit(){
    if(this.perfil.userAccount.autoridad === 'ALUMNO') {
      for(let u of this.universidades){
        if (u.nombre === this.form.get('universidad').value){
          this.alumno.universidad = u;
        }
      }
      for(let f of this.facultades){
        if (f.nombre === this.form.get('facultad').value){
          this.alumno.facultad = f;
        }
      }
      for(let g of this.grados){
        if (g.nombre === this.form.get('grado').value){
          this.alumno.grado = g;
        }
      }

      this.alumno.id = this.perfil.id;
      this.alumno.nombre = this.form.get('nombre').value;
      this.alumno.apellido1 = this.form.get('apellido1').value;
      this.alumno.apellido2 = this.form.get('apellido2').value;
      this.alumno.dni = this.form.get('dni').value;
      this.alumno.email = this.form.get('email').value;
      this.alumno.telefono = this.form.get('telefono').value;
      this.alumno.userAccount.id = this.perfil.userAccount.id
      this.alumno.userAccount.username = this.form.get('useraccount').get('username').value;
      this.alumno.userAccount.password = this.form.get('useraccount').get('password').value;
      this.alumno.userAccount.autoridad = this.perfil.userAccount.autoridad;
      this.alumno.contadorDescuento = this.perfil.contadorDescuento;
    }
    if(this.perfil.userAccount.autoridad === 'PROFESOR') {
      this.profesor.valoracionMedia = this.perfil['valoracionMedia']
      this.profesor.id = this.perfil.id;
      this.profesor.nombre = this.form.get('nombre').value;
      this.profesor.apellido1 = this.form.get('apellido1').value;
      this.profesor.apellido2 = this.form.get('apellido2').value;
      this.profesor.dni = this.form.get('dni').value;
      this.profesor.email = this.form.get('email').value;
      this.profesor.telefono = this.form.get('telefono').value;
      this.profesor.userAccount.id = this.perfil.userAccount.id
      this.profesor.userAccount.username = this.form.get('useraccount').get('username').value;
      this.profesor.userAccount.password = this.form.get('useraccount').get('password').value;
      this.profesor.userAccount.autoridad = this.perfil.userAccount.autoridad;
      this.profesor.expedienteValidado = this.perfil.expedienteValidado
      this.profesor.tarifaPremium = this.perfil.tarifaPremium
      this.profesor.fechaPagoPremium = this.perfil.fechaPagoPremium

      if(!this.fileToUpload) {
        this.profesor.expendiente = this.perfil['expendiente']
      } else {
        this.profesor.expendiente = this.perfil['expendiente']
        this.profesor.expendiente.id = -1
      }
    }

    if(this.perfil.userAccount.autoridad === 'ADMIN') {
      this.admin.id = this.perfil.id;
      this.admin.nombre = this.form.get('nombre').value;
      this.admin.apellido1 = this.form.get('apellido1').value;
      this.admin.apellido2 = this.form.get('apellido2').value;
      this.admin.dni = this.form.get('dni').value;
      this.admin.email = this.form.get('email').value;
      this.admin.telefono = this.form.get('telefono').value;
      this.admin.userAccount.id = this.perfil.userAccount.id
      this.admin.userAccount.username = this.form.get('useraccount').get('username').value;
      this.admin.userAccount.password = this.form.get('useraccount').get('password').value;
      this.admin.userAccount.autoridad = this.perfil.userAccount.autoridad;
    }

    if(this.perfil.userAccount.autoridad === 'ADMIN') {
      this.adminService.editarAdmin(this.admin, this.perfil.id).subscribe(
        res => {
          this.editarPerfil=false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
          this.mostrarMensajeActualizarPerfil = true;
        });

    } else if(this.perfil.userAccount.autoridad === 'ALUMNO'){
      this.alumnoService.editarAlumno(this.alumno, this.perfil.id).subscribe(
        res => {
          this.editarPerfil=false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
          this.mostrarMensajeActualizarPerfil = true;
        });
    }else{

      const formData: FormData = new FormData();
      formData.append('profesor', JSON.stringify(this.profesor));
      if(this.fileToUpload) {
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
      }

      this.profesorService.editarProfesor(formData, this.perfil.id).subscribe(
        res => {
          this.editarPerfil = false;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.perfil = res;
          this.mostrarMensajeActualizarPerfil = true;
        },
        error =>{
          this.error = error.error.mensaje;
        })
    }
  }


  fileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  download(id){
    var fichero: any;
    this.fileService.getFile(id).subscribe(res =>{
      fichero = res;
      this.fileService.downloadFile(fichero.id).subscribe(
        res => {
          saveAs(res , fichero.fileName)
        }
      )
    },
    error => console.log(error)
    )
  }

  getFacultades(valor:string){
    if(valor !== '') {
      this.facultadService.getFacultadesPorUniversidad(valor).subscribe(
        data => {
          this.grados = []
          this.facultades = data
        }
      )
    } else {
      this.facultades = []
      this.grados = []
    }
    this.form.get('facultad').setValue('')
    this.form.get('grado').setValue('')
  }


  getGrados(valor:string){
    if(valor !== '') {
      this.gradoService.getGradosPorUniversidadYFacultad(this.form.get('universidad').value,valor).subscribe(
        data => {
          this.grados = data
        }
      )
    } else {
      this.grados = []
    }
    this.form.get('grado').setValue('')
  }



  peticionParaSerOlvidado(){
    /*
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'   
    });
    Swal.showLoading();
    */

    if(JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'PROFESOR'){
      this.profesorService.peticionDeOlvido(JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
        console.log(data);
        //Swal.close();
        swal.fire('Petición realizada con exito.','Pronto se procederá a eliminar sus datos del sistema.', 'success');
        this.route.navigateByUrl('inicio');
      })

    }else if(JSON.parse(localStorage.getItem('usuario')).userAccount.autoridad === 'ALUMNO'){
      this.alumnoService.peticionDeOlvido(JSON.parse(localStorage.getItem('usuario')).id).subscribe(data=>{
        console.log(data);
        //Swal.close();
        swal.fire('Petición realizada con exito.','Pronto se procederá a eliminar sus datos del sistema.', 'success');
        this.route.navigateByUrl('inicio');
      });
    }

    
  }
}
