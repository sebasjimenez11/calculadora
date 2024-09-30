<?php

include_once 'Classes/Calculadora.php';

$calculadora = new Calculadora();

function operacionActual($Id)
{
    global $calculadora;
    return $calculadora->getOperacionActual($Id);
}

function guardarOperacion($operacion, $operandos, $operadores, $Id = null, $resultado = 0)
{
    global $calculadora;
    return $calculadora->updateOperacion($operacion, $operandos, $operadores, $Id, $resultado);
}

function numeroOperando($operacion, $operacionAnterior)
{
    global $calculadora;
    return $calculadora->getNumOperando($operacion, $operacionAnterior);
}

function limpiar($Id)
{
    global $calculadora;
    return $calculadora->limpiar($Id);
}

function traerOperandos($Id)
{
    global $calculadora;
    return $calculadora->getOperandos($Id);
}

function traerOperadores($Id)
{
    global $calculadora;
    return $calculadora->getOperaradores($Id);
}

function traerHistorial()
{
    global $calculadora;
    return $calculadora->getHistorial();
}

function totalOperacion($operandos, $operadores){
    global $calculadora;
    return $calculadora->total($operandos, $operadores);
}

function borrarHistorial(){
    global $calculadora;
    return $calculadora->borrarHistorial();
}