const btn = document.querySelectorAll('.btn');
let valorActual = document.querySelector('.pantalla');
let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let operaciones = ['+', '/', '*', '-'];
let valor = 0;
let numero = 0;
let operacion = 0;
let punto = 0;

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
                calculadora('historial')
                break;
            default:
                agregar(btn.textContent);
                break;
        }
    })
})

const calculadora = async (accion) => {
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
            const data = await peticionServidor('historial', 'historial', operacion);
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    historialCalculadora(data[i].operacion_actual, data[i].resultado)
                }
            }
        default: break;
    }
}

const agregar = (content) => {
    if (valorActual.value == "0") {
        valorActual.value = content;
    } else {
        valorActual.value = valorActual.value + content;
    }
}

const limpiar = () => {
    peticionServidor('limpiar', 'limpiar', operacion);
    valorAnteriror = valorActual.value;
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

const validarNumeros = (caracter) => {
    if (numeros.includes(caracter)) {
        agregar(caracter);
    }
}

const peticionServidor = async (valorOperando, operador, NumOperacion) => {
    try {
        let Id = localStorage.getItem('Id');
        if (Id === 'undefined') {
            Id = null;
        }
        const response = await fetch('/server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                operacion: valorOperando,
                Opc: operador,
                NumOperacion: NumOperacion,
                Id: Id 
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        localStorage.setItem('Id',data.Id);
        return data.value;
    } catch (error) {
        console.error('Error en la peticion:', error);
    }
}

const historialCalculadora = async (resultado, operacion) => {
    let historial = document.getElementById('historial'); 
    historial.style.display ='block'

    let nuevoResultado = document.createElement('span');
    let nuevaOperacion = document.createElement('span');

    nuevoResultado.classList.add('resultado');
    nuevaOperacion.classList.add('operacion');
    nuevoResultado.textContent = resultado;
    nuevaOperacion.textContent = operacion;

    historial.appendChild(nuevoResultado);
    historial.appendChild(nuevaOperacion);
}
