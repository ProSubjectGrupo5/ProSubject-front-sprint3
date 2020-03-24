import {AbstractControl} from '@angular/forms'

export function validDNIValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const dni = control.value
    
    const letras =['T','R','W','A','G','M','Y','F','P','D','X','B','N','J',
        'Z','S','Q','V','H','L','C','K','E']

    let serieNumeros = dni.substring(0, 8)
    let letra = dni.substring(8, 9)
    let modulo = parseInt(serieNumeros) % 23

    return letra != letras[modulo] 
    ? {'noValidDni': true} : null;
}
    