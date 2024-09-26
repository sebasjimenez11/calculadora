<?php
session_start();

$Data = file_get_contents('php://input');
if ($Data) {
    $Data = json_decode($Data, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['Error' => 'Datos JSON inválidos']);
        exit;
    }
} else {
    die('{"Error":"any"}');
}

include_once 'Classes/Calculadora.php';
$calculadora = new Calculadora;

header('Content-Type: application/json');

if (isset($Data['OP']) && isset($Data['valor'])) {
    switch ($Data['OP']) {
        case 'suma':
            $calculadora->setOperadores('+');
            $calculadora->setOperandos($Data['valor']);
            echo json_encode(['value' => $calculadora->getOperandos(), 'guardado' => true]);
            break;

        case 'resta':
            $calculadora->setOperadores('-');
            $calculadora->setOperandos($Data['valor']);
            echo json_encode(['value' => $calculadora->getOperandos(), 'guardado' => true]);
            break;

        case 'multiplicacion':
            $calculadora->setOperadores('*');
            $calculadora->setOperandos($Data['valor']);
            echo json_encode(['value' => $calculadora->getOperandos(), 'guardado' => true]);
            break;

        case 'division':
            $calculadora->setOperadores('/');
            $calculadora->setOperandos($Data['valor']);
            echo json_encode(['value' => $calculadora->getOperandos(), 'guardado' => true]);
            break;

        case 'total':
            $calculadora->setOperandos($Data['valor']);
            $operadores = $calculadora->getOperadores();
            $operandos = $calculadora->getOperandos();
            $valorTotal = $calculadora->total();
            $calculadora->clear();
            echo json_encode(['value' => $valorTotal]);
            break;

        case 'borrar':
            $calculadora->borrar();
            echo json_encode(['message' => 'Datos borrados']);
            break;

        case 'limpiar':
            $calculadora->clear();
            echo json_encode(['message' => 'Datos limpiados']);
            break;

        default:
            echo json_encode(['Error' => 'Operación no válida']);
            break;
    }
} else {
    echo json_encode(['Error' => 'No se recibieron los datos necesarios']);
}
