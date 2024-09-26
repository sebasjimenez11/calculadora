const btn = document.querySelectorAll('.btn');
let valorActual = document.querySelector('.pantalla');
let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
let valorAnteriror = "";
let operaciones = ['+', '/', '*', '-']
let pocision = 0;
let operacion = 0;
let punto = 0;
let operadores = [];
let operandos = [];


document.addEventListener('keydown', (e) => {

    switch (e.key) {
        case "+":
            fetch('/calculadora.php?OP=suma', {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'text/html'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
                .then(data => {
                    console.log(data);
                });
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
            calculadora('total')
            break;
        case 'Backspace':
            calculadora('borrar');
            break
        case 'c':
            calculadora('limpiar')
            break
        case 'C':
            calculadora('limpiar')
            break
        case '.':
            calculadora('punto')
            break
        default:
            validarNumeros(e.key);
            break;
    }
})

const validarNumeros = (caracter) => {
    if (numeros.includes(caracter)) {
        agregar(caracter);
    }
}


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

const calculadora = (accion) => {
    switch (accion) {
        case 'suma':
            operandos.push(parseFloat(valorOperando()))
            operadores.push("+");
            valorActual.value = valorActual.value + '+';
            valorAnteriror = valorActual.value;
            punto = 0;
            break;
        case 'resta':
            operandos.push(parseFloat(valorOperando()))
            operadores.push("-");
            valorActual.value = valorActual.value + '-';
            valorAnteriror = valorActual.value;
            punto = 0;
            break;
        case 'division':
            operandos.push(parseFloat(valorOperando()))
            operadores.push("/");
            valorActual.value = valorActual.value + '/';
            valorAnteriror = valorActual.value;
            punto = 0;
            break;
        case 'multiplicacion':
            operandos.push(parseFloat(valorOperando()))
            operadores.push("*");
            valorActual.value = valorActual.value + '*';
            valorAnteriror = valorActual.value;
            punto = 0;
            break;
        case 'total':
            console.log("operandos en total: ", operandos);
            console.log("operadores en total: ", operadores);
            operandos.push(parseFloat(valorOperando()));
            const totalOperacion = total();
            if (isNaN(totalOperacion)) {
                valorActual.value = "Error";
            } else {
                valorActual.value = totalOperacion;
            }
            operadores = [];
            operandos = [];
            valorAnteriror = valorActual.value;
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
        valorActual.value = content;
    } else {
        valorActual.value = valorActual.value + content;
    }
}

const valorOperando = () => {
    if (operacion === 0) {
        valorAnteriror = valorActual.value;
        operacion = 1;
        return valorActual.value;
    } else {
        let valor = "";
        for (let i = 0; i < valorActual.value.length; i++) {
            if (valorActual.value[i] != valorAnteriror[i]) {
                valor += valorActual.value[i];
            }
        }
        return valor;
    }
}

const total = () => {
    let ops = [...operadores];
    let nums = [...operandos];

    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "*" || ops[i] === "/") {
            let result;
            if (ops[i] === "*") {
                result = multiplicacion(nums[i], nums[i + 1]);
            } else if (ops[i] === "/") {
                result = division(nums[i], nums[i + 1]);
            }
            nums[i] = result;
            nums.splice(i + 1, 1);
            ops.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < ops.length; i++) {
        let result;
        if (ops[i] === "+") {
            result = suma(nums[i], nums[i + 1]);
        } else if (ops[i] === "-") {
            result = resta(nums[i], nums[i + 1]);
        }

        nums[i] = result;
        nums.splice(i + 1, 1);
        ops.splice(i, 1);
        i--;
    }

    let totalOperacion = nums[0];
    return totalOperacion;
}

const limpiar = () => {
    operadores = [];
    operandos = [];
    valorAnteriror = valorActual.value;
    operacion = 0;
    punto = 0;
    valorActual.value = 0;
}

const borrar = () => {
    let valorInput = valorActual.value;
    if (valorInput.length > 1) {
        if (operaciones.includes(valorInput[valorInput.length - 1])) {
            operandos.pop();
            operadores.pop();
            valorActual.value = valorInput.slice(0, -1);
        } else if (valorInput[valorInput.length - 1] === '.') {
            punto = 0;
            valorActual.value = valorInput.slice(0, -1);
        } else if (valorInput === 'Error') {
            valorActual.value = 0
        } else {
            valorActual.value = valorInput.slice(0, -1);
        }
    } else {
        valorActual.value = 0
    }
}

const suma = (num1, num2) => {
    return num1 + num2
}

const resta = (num1, num2) => {
    return num1 - num2
}

const division = (num1, num2) => {
    return num1 / num2;
}

const exponenciacion = (num1, num2) => {
    return num1 ** num2;
}

const multiplicacion = (num1, num2) => {
    return num1 * num2
}