import {AbstractControl} from '@angular/forms'

export function validarHoras(control: AbstractControl): {[key: string]: boolean} | null {
    const fechaInicio = control.get('horaInicio').value.split(':');
    const fechaFin = control.get('horaFin').value.split(':');

    if(fechaFin[0] == '00'){
        fechaFin[0] = 24;
    }

    const horaIni = new Date(2050,0,0,parseInt(fechaInicio[0]), parseInt(fechaInicio[1]))
    const horaFin = new Date(2050,0,0,parseInt(fechaFin[0]), parseInt(fechaFin[1]))


    return horaIni >= horaFin 
    ? {'noValidHour': true} : null;
}
    