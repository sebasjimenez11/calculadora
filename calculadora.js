const btn = document.querySelectorAll('.btn');
let valorActual = document.querySelector('.pantalla');
let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let valor = 0;
let numero = 0;
let valorAnteriror = "";
let operaciones = ['+', '/', '*', '-'];
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
                calculadora('total')
                break;
            case 'borrar':
                calculadora('borrar');
                break
            case 'limpiar':
                calculadora('limpiar')
                break
            case 'punto':
                calculadora('punto')
                break
            default:
                agregar(btn.textContent)
                break;
        }
    })
})

const calculadora = async (accion) => {
    switch (accion) {
        case 'suma':
            numero = parseFloat(valorOperando());
            await peticionServidor(numero, 'suma');
            valorActualPantalla('+');
            break;
        case 'resta':
            numero = parseFloat(valorOperando());
            await peticionServidor(numero, 'resta');
            valorActualPantalla('-');
            break;
        case 'division':
            numero = parseFloat(valorOperando());
            await peticionServidor(numero, 'division');
            valorActualPantalla('/');
            break;
        case 'multiplicacion':
            numero = parseFloat(valorOperando());
            await peticionServidor(numero, 'multiplicacion');
            valorActualPantalla('*');
            break;
        case 'total':
            numero = parseFloat(valorOperando());
            let resultado = await peticionServidor(numero, 'total');
            valorActual.value = resultado
            valorAnteriror = resultado;
            operacion = 0;
            punto = 0;
            break;
        case 'borrar':
            borrar();
            break
        case 'limpiar':
            limpiar();
            break
        case 'punto':
            if (punto == 0) {
                agregar('.')
                punto = 1;
            }
            break
        default: break;
    }
}

const agregar = (content) => {
    if (valorActual.value == "0") {
        valor = content;
        valorActual.value = valor
    } else {
        valor = valorActual.value + content
        valorActual.value = valor
    }
}

const valorOperando = () => {
    if (operacion === 0) {
        valorAnteriror = valorActual.value;
        console.log(valorActual.value);
        operacion = 1;
        return valorActual.value;
    } else {
        let valor = 0;
        for (let i = 0; i < valorActual.value.length; i++) {
            if (valorActual.value[i] != valorAnteriror[i]) {
                valor += valorActual.value[i];
            }
        }
        return valor;
    }
}

const limpiar = () => {
    peticionServidor('limpiar', 'limpiar');
    valorAnteriror = valorActual.value;
    operacion = 0;
    punto = 0;
    valorActual.value = 0;
}

const borrar = async () => {
    let valorInput = valorActual.value;
    if (valorInput.length > 1) {
        if (operaciones.includes(valorInput[valorInput.length - 1])) {
            valorActual.value = valorInput.slice(0, -1);
            valorAnteriror = valorActual.value;
            await peticionServidor('borrar', 'borrar');
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
    }
}


const valorActualPantalla = (signo) => {
    valorActual.value = valorActual.value + signo;
    valorAnteriror = valorActual.value;
    punto = 0;
}

const validarNumeros = (caracter) => {
    if (numeros.includes(caracter)) {
        agregar(caracter);
    }
}

const peticionServidor = async (valorOperando, operador) => {
    try {
        const response = await fetch('/calculadora.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                valor: valorOperando,
                OP: operador
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error('Error en la peticion:', error);
    }
}