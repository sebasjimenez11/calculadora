<?php

print "Test";
$array = [];
for ($i = 0; $i < 100; $i++) {
    // array_push($array, 0);
    $array[] = $i;
}

$array = array_filter($array, function ($index) {
    return ($index % 2);
});


print('<pre>');
print_r($array);
die("fin de la ejecución");
exit;
/* unset($array[0]); */
$recorrer = count($array);
for ($i = 0; $i < $recorrer; $i++) {
    if ($i % 2 == 0) {
        unset($array[$i]);
    }
}

// print_r($array);

// $arrayImpares = [];
// foreach ($array as $key => $value) {
//     $arrayImpares[] = $key;
// }

$arrayCopia = [];

// foreach ($array as $key => $value) {
//     $arrayCopia[] = 0;
// }
/* $arrayImpares = array_keys($array); */
$arrayCopia = array_values($array);
print('<br>');
print_r($arrayCopia);
