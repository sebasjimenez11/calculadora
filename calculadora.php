<?php

include_once 'Classes/Calculadora.php';
header('Content-Type: text/html');
$calculadora = new Calculadora;


if (isset($_GET['OP'])) {
    if ($_GET['OP'] == 'suma') {
        print $calculadora->suma(1, 3);
    }
}
