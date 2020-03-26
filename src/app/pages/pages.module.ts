
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { BusquedaAsignaturaComponent } from './busqueda-asignatura/busqueda-asignatura.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

import { ListadoEspaciosComponent } from './busqueda-asignatura/listado-espacios/listado-espacios.component';

//----CRISTIAN----
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from "ngx-pagination";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { LoginComponent } from './login/login.component';
import { CreacionEspacioComponent } from './creacion-espacio/creacion-espacio.component';
import { DetallesEspacioComponent } from './busqueda-asignatura/detalles-espacio/detalles-espacio.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EspaciosProfesorComponent } from './espacios-profesor/espacios-profesor.component';
import { EspaciosAlumnoComponent } from './espacios-alumno/espacios-alumno.component';
import { HorariosComponent } from './horarios/horarios.component';

import { RegistroComponent } from './registro/registro.component';

import { NuevoAdminComponent } from './nuevo-admin/nuevo-admin.component';

import { EspaciosEditablesProfesorComponent } from './espacios-editables-profesor/espacios-editables-profesor.component';
import { VerHorariosComponent } from './espacios-editables-profesor/ver-horarios/ver-horarios.component';
import { CrearHorarioComponent } from './espacios-editables-profesor/ver-horarios/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './espacios-editables-profesor/ver-horarios/editar-horario/editar-horario.component';
import { EditarEspaciosComponent } from './espacios-editables-profesor/editar-espacios/editar-espacios.component';
import { PerfilComponent } from './perfil/perfil.component';

import { ForoComponent } from './foro/foro.component';
import { ValidarProfesorComponent } from './validar-profesor/validar-profesor.component';




@NgModule({
    declarations: [
        PagesComponent,
        BusquedaAsignaturaComponent,
        HomeComponent,
        ListadoEspaciosComponent,
        LoginComponent,
        CreacionEspacioComponent,
        DetallesEspacioComponent,
        EspaciosProfesorComponent,
        EspaciosAlumnoComponent,
        HorariosComponent,
        RegistroComponent,
        NuevoAdminComponent,

        EspaciosEditablesProfesorComponent,
        VerHorariosComponent,
        CrearHorarioComponent,
        EditarHorarioComponent,
        EditarEspaciosComponent,
        PerfilComponent,

        ForoComponent,

        ValidarProfesorComponent,

    ],
    exports: [
        CommonModule
    ],
    imports: [
        PAGES_ROUTES,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        NgxPaginationModule,
        NgxMaterialTimepickerModule,
        BrowserAnimationsModule
    ]
})
export class PagesModule { }
