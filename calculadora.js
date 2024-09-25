const btn = document.querySelectorAll('.btn');
let valorActual = document.querySelector('.pantalla');
let valorAnteriror = "";
let pocision = 0;
let operadores = [];
let operandos = [];

/* switch (operador) {
    case '+':
        valorAnteriror = valorActual.value;
        operadores.push(valorAnteriror);
        valorActual.value = valorAnteriror + "+"
        primeraOperacion = 0;
        break;
    case '-':
        valorAnteriror = valorActual.value;
        operaciones.push(valorAnteriror);
        valorActual.value = valorAnteriror + "-"
        primeraOperacion = 0;
        break;
    case '*':
        valorAnteriror = valorActual.value;
        operaciones.push(valorAnteriror);
        valorActual.value = valorAnteriror + "*"
        primeraOperacion = 0;
        break;
    case '/':
        valorAnteriror = valorActual.value;
        operaciones.push(valorAnteriror);
        valorActual.value = valorAnteriror + "/"
        primeraOperacion = 0;
        break;
    default:
        break;
} */
btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        switch (btn.id) {
            case 'suma':
                
                break;
            case 'resta':

                break;
            case 'division':

                break;
            case 'multiplicacion':

                break;
            case 'total':

                break;
            case 'borrar':

                break
            default:
                agregar(btn.textContent)
                break;
        }
    })
})

const agregar = (content) => {
    if (valorActual.value == "0") {
        valorActual.value = content;
    } else {
        valorActual.value = valorActual.value + content;
    }
}

const suma = (num1, num2) => {
    return num1 + num2
}

function resta(num1, num2) {
    return num1 - num2
}

function division(num1, num2) {
    return num1 / num2;
}

function exponenciacion(num1, num2) {
    return num1 ** num2;
}


function multiplicacion(num1, num2) {
    return num1 * num2
}

