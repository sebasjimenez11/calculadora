<?php

include_once 'Classes/Calculadora.php';
header('Content-Type: text/html');
$calculadora = new Calculadora;


if (isset($_GET['OP'])) {

    print $calculadora->$_GET['OP'](5, 3);
}
