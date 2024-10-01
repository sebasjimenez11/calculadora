<?php
include_once 'calculadora.php';

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
if (isset($Data['Opc']) && isset($Data['operacion'])) {
    if (in_array($Data['Opc'], ['+', '-', '*', '/']) && isset($Data['Id']) != null) {
        $operandos = traerOperandos($Data['Id']);
        $operadores = traerOperadores($Data['Id']);
        $operacionAnterior = operacionActual($Data['Id']);
        $numeroOperador = numeroOperando($Data['operacion'], $operacionAnterior);

        array_push($operandos, $Data['Opc']);
        array_push($operadores, floatval($numeroOperador));

        guardarOperacion($Data['operacion'], $operandos, $operadores, $Data['Id']);
        echo json_encode(['value' => $Data['operacion'] . $Data['Opc'], 'Id' =>  $Data['Id']]);
    } else {
        switch ($Data['Opc']) {
            case 'total':
                $operandos = traerOperandos($Data['Id']);
                $operadores = traerOperadores($Data['Id']);
                $operacionAnterior = operacionActual($Data['Id']);
                $numeroOperador = numeroOperando($Data['operacion'], $operacionAnterior);

                array_push($operadores, floatval($numeroOperador));
                $total = totalOperacion($operadores, $operandos);
                actualizarTotal($operandos,$operadores, $Data['operacion'], $Data['Id'],$total);
                echo json_encode(['value' => $total]);
                break;
            case 'historial':
                echo json_encode(['value' => traerHistorial()]);
                break;
            case 'limpiar':
                $valor= limpiar($Data['Id']);
                echo json_encode(['value' => $valor, 'dataId' => $Data['Id']]);
                break;
            case 'borrar':
                $operandos = traerOperandos($Data['Id']);
                $operadores = traerOperadores($Data['Id']);
                $borrarOperacion = borrarOperacionActual($Data['operacion'],$operandos,$operadores);
                guardarOperacion($borrarOperacion[0],$borrarOperacion[1],$borrarOperacion[2], $Data['Id']);
                echo json_encode(['value' => $Data['operacion'], 'Id' =>  $Data['Id']]);
                break;
            case 'borrarHistorial':
                echo json_encode(['value' => borrarHistorial()]);
                break;
            default:
                if (in_array($Data['Opc'], ['+', '-', '*', '/'])) {
                    $operandos = [];
                    $operadores = [];

                    array_push($operandos, $Data['Opc']);
                    array_push($operadores, floatval($Data['operacion']));

                    $Id = guardarOperacion($Data['operacion'], $operandos, $operadores);
                    echo json_encode(['value' => $Data['operacion'] . $Data['Opc'], 'Id' => $Id]);
                }
            break;
        }
    }
}
