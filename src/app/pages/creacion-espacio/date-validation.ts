import {AbstractControl} from '@angular/forms'

export function validarFecha(control: AbstractControl): {[key: string]: boolean} | null {
    const fechaIni = control.value.split('-');

    const fechaInicio = new Date(fechaIni[0], fechaIni[1], fechaIni[2]-31);
    const today =  new Date();
    
    return fechaInicio <= today
    ? {'noValidDate': true} : null;
}
    