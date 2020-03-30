import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    HeaderService,
    BusquedaAsignaturaService,
    GradoService,
    EspacioService,
    CursoService,
    AsignaturaService,
    FacultadService,
    LoginService,
    ProfesorGuard,
    AlumnoGuard,
    ProfesorService,
    AdministradorGuard,
    BreadcrumbsService,
    AlumnoService,
    AdminService,
    ValidadoresService,
    ForoService,
    RespuestaService,
    AlumnoProfesorGuard,
    WebSocketService,
    FileService,
    CarritoService
    
 } from './services.index';
import { ProfesorExpedienteGuard } from './guards/profesor.guard-expediente';






@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HeaderService,
    BusquedaAsignaturaService,
    GradoService,
    EspacioService,
    CursoService,
    AsignaturaService,
    FacultadService,
    ProfesorService,
    LoginService,
    ProfesorGuard,
    AlumnoGuard,
    AdministradorGuard,
    BreadcrumbsService,
    AlumnoService,
    AdminService,
    ValidadoresService,
    ForoService,
    RespuestaService,
    AlumnoProfesorGuard,
    WebSocketService,
    FileService,
    CarritoService, 
    ProfesorExpedienteGuard
  ],
  declarations: []
})
export class ServiceModule { }
