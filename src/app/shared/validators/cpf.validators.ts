import { AbstractControl } from '@angular/forms';

export class cpfValidator {

    static validate(control: AbstractControl): {[key: string]: boolean} {
        if (this.cpfValido(control.value)) {
            return null;
        }
        return {'cpf':true};
    }

    static cpfValido(cpf: any): boolean {

        return true;
    }
}