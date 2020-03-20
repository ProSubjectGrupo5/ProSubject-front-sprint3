import {AbstractControl} from '@angular/forms'

export function confirmPasswordValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    return password && confirmPassword && password.value != confirmPassword.value 
    ? {'noMatch': true} : null;
}
    