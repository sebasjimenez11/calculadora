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
$valorOperando = 0;

header('Content-Type: application/json');

if (isset($Data['OP']) && isset($Data['valor'])) {
    switch ($Data['OP']) {
        case 'suma':
            $calculadora->setOperadores('+');
            $valorOperando = floatval($calculadora->getNumOperando($Data['valor'], '+', $Data['validacion']));
            $calculadora->setOperandos($valorOperando);
            echo json_encode(['value' => $calculadora->getOperacionAnterior()]);
            break;

        case 'resta':
            $calculadora->setOperadores('-');
            $valorOperando = floatval($calculadora->getNumOperando($Data['valor'], '-', $Data['validacion']));
            $calculadora->setOperandos($valorOperando);
            echo json_encode(['value' => $calculadora->getOperacionAnterior()]);
            break;

        case 'multiplicacion':
            $calculadora->setOperadores('*');
            $valorOperando = floatval($calculadora->getNumOperando($Data['valor'], '*', $Data['validacion']));
            $calculadora->setOperandos($valorOperando);
            echo json_encode(['value' => $calculadora->getOperacionAnterior()]);
            break;

        case 'division':
            $calculadora->setOperadores('/');
            $valorOperando = floatval($calculadora->getNumOperando($Data['valor'], '/', $Data['validacion']));
            $calculadora->setOperandos($valorOperando);
            echo json_encode(['value' => $calculadora->getOperacionAnterior()]);
            break;

        case 'total':
            $valorOperando = floatval($calculadora->getNumOperando($Data['valor'], '', $Data['validacion']));
            $calculadora->setOperandos($valorOperando);
            $valorTotal = $calculadora->total();
            $calculadora->setHistorial($Data['valor'],$valorTotal);
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

        case 'historial':

            break;
        default:
            echo json_encode(['Error' => 'Operación no válida']);
            break;
    }
} else {
    echo json_encode(['Error' => 'No se recibieron los datos necesarios']);
}
