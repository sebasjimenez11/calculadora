const btn = document.querySelectorAll('.btn');
let valorActual = document.querySelector('.pantalla');
let valorAnteriror = "";
let pocision = 0;
let operacion = 0;
let operadores = [];
let operandos = [];

btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        switch (btn.id) {
            case 'suma':
                operandos.push(parseFloat(valorOperando()))
                operadores.push("+");
                valorActual.value = valorActual.value + '+';
                valorAnteriror = valorActual.value;
                break;
            case 'resta':
                operandos.push(parseFloat(valorOperando()))
                operadores.push("-");
                valorActual.value = valorActual.value + '-';
                valorAnteriror = valorActual.value;
                break;
            case 'division':
                operandos.push(parseFloat(valorOperando()))
                operadores.push("/");
                valorActual.value = valorActual.value + '/';
                valorAnteriror = valorActual.value;
                break;
            case 'multiplicacion':
                operandos.push(parseFloat(valorOperando()))
                operadores.push("*");
                valorActual.value = valorActual.value + '*';
                valorAnteriror = valorActual.value;
                break;
            case 'total':
                operandos.push(parseFloat(valorOperando()));
                const totalOperacion = total();
                valorActual.value = totalOperacion;
                operadores = [];
                operandos = [];
                valorAnteriror = valorActual.value;
                operacion = 0;
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

