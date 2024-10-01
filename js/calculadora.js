import { peticionServidor } from './peticionesServidor.js';
import { borrarHistorial, openModal } from './historial.js';
let operaciones = ['+', '/', '*', '-'];
let valor = 0;
let valorActual = document.querySelector('.pantalla');
let punto = 0;

export const calculadora = async (accion) => {
    switch (accion) {
        case 'suma':
            valor = await peticionServidor(valorActual.value, '+');
            valorActualPantalla(valor);
            break;
        case 'resta':
            valor = await peticionServidor(valorActual.value, '-');
            valorActualPantalla(valor);
            break;
        case 'division':
            valor = await peticionServidor(valorActual.value, '/');
            valorActualPantalla(valor);
            break;
        case 'multiplicacion':
            valor = await peticionServidor(valorActual.value, '*');
            valorActualPantalla(valor);
            break;
        case 'total':
            valor = await peticionServidor(valorActual.value, 'total');
            valorActualPantalla(valor);
            break;
        case 'borrar':
            borrar();
            break;
        case 'limpiar':
            limpiar();
            break;
        case 'punto':
            if (punto == 0) {
                agregar('.');
                punto = 1;
            }
            break;
        case 'historial':
            openModal();
            break;
        case 'borrarHistorial':
            borrarHistorial();
            break;
        case 'traerOperacionHistorial':
            break;
        default: break;
    }
}

export const agregar = (content) => {
    if (valorActual.value == "0") {
        valorActual.value = content;
    } else {
        valorActual.value = valorActual.value + content;
    }
}

const limpiar = () => {
    peticionServidor('limpiar', 'limpiar');
    punto = 0;
    valorActual.value = 0;
    localStorage.removeItem('Id');
}

const borrar = async () => {
    let valorInput = valorActual.value;
    if (valorInput.length > 1) {
        if (operaciones.includes(valorInput[valorInput.length - 1])) {
            valorInput = valorInput.slice(0, -1);
            valorInput = await peticionServidor(valorInput, 'borrar');
            valorActual.value = valorInput;
        } else if (valorInput[valorInput.length - 1] === '.') {
            punto = 0;
            valorActual.value = valorInput.slice(0, -1);
        } else if (valorInput === 'Error') {
            valorActual.value = 0;
        } else {
            valorActual.value = valorInput.slice(0, -1);
        }
    } else {
        limpiar();
    }
}


const valorActualPantalla = (value) => {
    valorActual.value = value;
    punto = 0;
}

