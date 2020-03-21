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
    ValidadoresService
 } from './services.index';






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
    ValidadoresService

  ],
  declarations: []
})
export class ServiceModule { }
