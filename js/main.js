import { calculadora, agregar } from './calculadora.js'
import { closeModal, isOpenModal } from './historial.js';
const btn = document.querySelectorAll('.btn');
const resultado = document.querySelectorAll('.resultado');
const operacion = document.querySelectorAll('.operacion');
let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

document.addEventListener('keydown', (e) => {
    console.log(e.key);
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
            if (isOpenModal) {
                closeModal();
            } else {
                calculadora('limpiar');
            }
            break;
        case 'Delete':
            if (isOpenModal) {
                calculadora('borrarHistorial');
            }
            break;
        case 'C':
            calculadora('limpiar');
            break;
        case 'h':
            calculadora('historial');
            break;
        case 'H':
            calculadora('historial');
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

resultado.forEach((btn) => {
    btn.addEventListener('click', () => {

    })
})

operacion.forEach((btn) => {
    btn.addEventListener('click', () => {
        
    })
})


const validarNumeros = (caracter) => {
    if (numeros.includes(caracter)) {
        agregar(caracter);
    }
}

