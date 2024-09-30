<?php
include_once './calculadora.php';

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

header('Content-Type: application/json');
if (isset($Data['Opc']) && isset($Data['operacion']) && isset($Data['NumOperacion'])) {
    if ($Data['Opc'] == '+' && $Data['Opc'] == '-' && $Data['Opc'] == '*' && $Data['Opc'] == '/' && isset($Data['Id'])) {
        $operandos = traerOperandos($Data['Id']);
        $operadores = traerOperadores($Data['Id']);
        $operacionAnterior = operacionActual($Data['Id']);
        $numeroOperador = numeroOperando($Data['operacion'], $operacionAnterior);

        array_push($operandos, $Data['Opc']);
        array_push($operadores, floatval($numeroOperador));

        guardarOperacion($Data['operacion'], $operandos, $operadores, $Id);
    } else  {
        switch ($Data['Opc']) {
            case 'total':
                $operandos = traerOperandos($Data['Id']);
                $operadores = traerOperadores($Data['Id']);
                $operacionAnterior = operacionActual($Data['Id']);
                $numeroOperador = numeroOperando($Data['operacion'], $operacionAnterior);

                array_push($operadores, floatval($numeroOperador));
                $total = totalOperacion($operandos, $operadores);
                guardarOperacion($Data['operacion'], $operandos, $operadores, $Id, $total);
                echo json_encode(['value'=>$total]);
            case 'historial':
                echo json_encode(['value' => traerHistorial()]);
                break;
            case 'limpiar':
                limpiar($Data['NumOperacion']);
                echo json_encode(['value' => 0]);
                break;
            case 'borrar':
                break;
            case 'borrarHistorial':
                echo json_encode(['value' => borrarHistorial()]);
                break;
            default:
                $operacionAnterior = [];
                $operadores = [];

                array_push($operandos, $Data['Opc']);
                array_push($operadores, floatval($Data['operacion']));

                $Id = guardarOperacion($Data['operacion'], $operandos, $operadores, $Id);
                echo json_encode(['value' => $Data['operacion'] . $Data['Opc'], 'Id' => $Id]);
                break;
        }
    }
}
