import {calculadora, agregar} from './calculadora.js'
import { closeModal } from './historial.js';
const btn = document.querySelectorAll('.btn');
let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "+":
            calculadora('suma');
            break;
        case '-':
            calculadora('resta');
            break;
        case '/':
            calculadora('division');
            break;
        case '*':
            calculadora('multiplicacion');
            break;
        case 'Enter':
            calculadora('total');
            break;
        case 'Backspace':
            calculadora('borrar');
            break;
        case 'c':
            calculadora('limpiar');
            break;
        case 'Escape':
            calculadora('limpiar');
            break;
        case 'C':
            calculadora('limpiar');
            break;
        case '.':
            calculadora('punto');
            break;
        default:
            validarNumeros(e.key);
            break;
    }
});

btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        switch (btn.id) {
            case 'suma':
                calculadora('suma');
                break;
            case 'resta':
                calculadora('resta');
                break;
            case 'division':
                calculadora('division');
                break;
            case 'multiplicacion':
                calculadora('multiplicacion');
                break;
            case 'total':
                calculadora('total');
                break;
            case 'borrar':
                calculadora('borrar');
                break;
            case 'limpiar':
                calculadora('limpiar');
                break;
            case 'punto':
                calculadora('punto');
                break;
            case 'btn-historial':
                calculadora('historial');
                break;
            case 'borrar-historial':
                calculadora('borrarHistorial');
                break;
            case 'close':
                closeModal();
                break;
            default:
                agregar(btn.textContent);
                break;
        }
    })
})

const validarNumeros = (caracter) => {
    if (numeros.includes(caracter)) {
        agregar(caracter);
    }
}

