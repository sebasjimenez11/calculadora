<?php

class Calculadora
{
    private $operadores = [];
    private $operandos = [];

    public function __construct()
    {
        if (isset($_SESSION['calculadora'])) {
            $data = $_SESSION['calculadora'];
            $this->operadores = $data['operadores'];
            $this->operandos = $data['operandos'];
        }
    }

    public function suma($a, $b)
    {
        return $a + $b;
    }

    public function resta($a, $b)
    {
        return $a - $b;
    }

    public function multiplicacion($a, $b)
    {
        return $a * $b;
    }

    public function division($a, $b)
    {
        return $a / $b;
    }

    public function total()
    {
        $i = 0;
        while ($i < count($this->operadores)) {
            if ($this->operadores[$i] == "*" || $this->operadores[$i] == '/') {
                if ($this->operadores[$i] == '*') {
                    $result = $this->multiplicacion($this->operandos[$i], $this->operandos[$i + 1]);
                } else {
                    $result = $this->division($this->operandos[$i], $this->operandos[$i + 1]);
                }
                $this->operandos[$i] = $result;
                array_splice($this->operandos, $i + 1, 1);
                array_splice($this->operadores, $i, 1);
            } else {
                $i++;
            }
        }
        $result = $this->operandos[0];
        for ($i = 0; $i < count($this->operadores); $i++) {
            if ($this->operadores[$i] == '+') {
                $result = $this->suma($result, $this->operandos[$i + 1]);
            } elseif ($this->operadores[$i] == '-') {
                $result = $this->resta($result, $this->operandos[$i + 1]);
            }
            array_splice($this->operandos, $i + 1, 1);
            array_splice($this->operadores, $i, 1);
            $i--;
        }

        return $result;
    }

    public function getOperandos()
    {
        return $this->operandos;
    }

    public function getOperadores()
    {
        return $this->operadores;
    }

    public function setOperandos($numero)
    {
        array_push($this->operandos, $numero);
        $this->saveState();
    }

    public function setOperadores($numero)
    {
        array_push($this->operadores, $numero);
        $this->saveState();
    }

    public function clear()
    {
        $this->operadores = [];
        $this->operandos = [];
        $this->saveState();
    }

    public function borrar()
    {
        array_slice($this->operadores, 0, -1);
        array_slice($this->operandos, 0, -1);
        $this->saveState();
    }

    private function saveState()
    {
        $_SESSION['calculadora'] = [
            'operadores' => $this->operadores,
            'operandos' => $this->operandos
        ];
    }
}
