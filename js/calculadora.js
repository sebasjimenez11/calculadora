import { peticionServidor } from './peticionesServidor.js';
import { openModal } from './historial.js';
let operaciones = ['+', '/', '*', '-'];
let valor = 0;
let valorActual = document.querySelector('.pantalla');
let operacion = 0;
let punto = 0;

export const calculadora = async (accion) => {
    switch (accion) {
        case 'suma':
            valor = await peticionServidor(valorActual.value, '+', operacion);
            valorActualPantalla(valor);
            operacion = 1;
            break;
        case 'resta':
            valor = await peticionServidor(valorActual.value, '-', operacion);
            valorActualPantalla(valor);
            operacion = 1;
            break;
        case 'division':
            valor = await peticionServidor(valorActual.value, '/', operacion);
            valorActualPantalla(valor);
            operacion = 1;
            break;
        case 'multiplicacion':
            valor = await peticionServidor(valorActual.value, '*', operacion);
            valorActualPantalla(valor);
            operacion = 1;
            break;
        case 'total':
            valor = await peticionServidor(valorActual.value, 'total', operacion);
            valorActualPantalla(valor);
            operacion = 0;
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
            openModal(operacion);
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
    peticionServidor('limpiar', 'limpiar', operacion);
    punto = 0;
    valorActual.value = 0;
    operacion = 0;
    localStorage.removeItem('Id');
}

const borrar = async () => {
    let valorInput = valorActual.value;
    if (valorInput.length > 1) {
        if (operaciones.includes(valorInput[valorInput.length - 1])) {
            valorActual.value = valorInput.slice(0, -1);
            valorAnteriror = valorActual.value;
            await peticionServidor('borrar', 'borrar', operacion);
        } else if (valorInput[valorInput.length - 1] === '.') {
            punto = 0;
            valorActual.value = valorInput.slice(0, -1);
        } else if (valorInput === 'Error') {
            valorActual.value = 0;
        } else {
            valorActual.value = valorInput.slice(0, -1);
        }
    } else {
        valorActual.value = 0;
        operacion = 0;
    }
}


const valorActualPantalla = (value) => {
    valorActual.value = value;
    punto = 0;
}

