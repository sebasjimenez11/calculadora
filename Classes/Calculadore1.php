<?php

include_once './Database.php';

class Calculadora
{
    private $conn;

    public function __construct()
    {
        $this->conn = Database::getConnection();
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

    public function total($operandos, $operadores)
    {
        $i = 0;
        while ($i < count($operadores)) {
            if ($operadores[$i] == "*" || $operadores[$i] == '/') {
                if ($operadores[$i] == '*') {
                    $result = $this->multiplicacion($operandos[$i], $operandos[$i + 1]);
                } else {
                    $result = $this->division($operandos[$i], $operandos[$i + 1]);
                }
                $operandos[$i] = $result;
                array_splice($operandos, $i + 1, 1);
                array_splice($operadores, $i, 1);
            } else {
                $i++;
            }
        }
        $result = $operandos[0];
        for ($i = 0; $i < count($operadores); $i++) {
            if ($operadores[$i] == '+') {
                $result = $this->suma($result, $operandos[$i + 1]);
            } elseif ($operadores[$i] == '-') {
                $result = $this->resta($result, $operandos[$i + 1]);
            }
            array_splice($operandos, $i + 1, 1);
            array_splice($operadores, $i, 1);
            $i--;
        }

        return $result;
    }


    public function getOperandos($Id)
    {
        try {
            $stmt = $this->conn->prepare('SELECT operandos FROM calculadora WHERE Id = :Id');
            $stmt->$this->conn->bindParams(':Id', $Id);
            $stmt->$this->conn->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $operandos = [];

            if ($result && isset($result['operandos'])) {
                $operandos = json_decode($result['operandos'], true);
                return $operandos ? $operandos : [];
            }

        } catch (PDOException $e) {
            echo "Error al obtener los operandos: " . $e->getMessage();
            return [];
        }
    }

    public function getOperandores($Id)
    {
        try {
            $stmt = $this->conn->prepare('SELECT operadores FROM calculadora WHERE Id = :Id');
            $stmt->$this->conn->bindParams(':Id', $Id);
            $stmt->$this->conn->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result && isset($result['operadores'])) {
                return json_decode($result['operadores'], true);
            }

            return [];
        } catch (PDOException $e) {
            echo "Error al obtener los operandores: " . $e->getMessage();
            return [];
        }
    }

    public function creacionOperacionActual($operacion, $operando, $operador, $validacion, $Id)
    {
        try {
            if ($validacion) {
                $stmt = $this->conn->prepare('INSERT INTO calculadore(operadores, operandos, operacion_actual, resultado) VALUES (:operadores, :operandos, :operacion, NULL)');
                $stmt->execute(array(':operadores' => $operador, ':operandos' => $operando, ':operacion' => $operacion));

                return $this->conn->lastInsertId();
            } else {
                $stmt = $this->conn->prepare('UPDATE calculadora SET operadores = :operadores, operandos = :operandos, operacion_actual = :operacion WHERE Id = :Id');

                $stmt->execute(array(':operadores' => $operador, ':operandos' => $operando, ':operacion' => $operacion, ':Id' => $Id));

                return $this->conn->lastInsertId();
            }
        } catch (PDOException $e) {
            echo "Error al obtener los operandores: " . $e->getMessage();
            return NULL;
        }
    }

    public function getOperacionActual($Id)
    {
        try {
            $stmt = $this->conn->prepare('SELECT operacion_actual FROM calculadora WHERE Id = :Id');
            $stmt->$this->conn->bindParams(':Id', $Id);
            $stmt->$this->conn->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result && isset($result['operacion_actual'])) {
                return $result['operacion_actual'];
            }

            return '';
        } catch (PDOException $e) {
            echo "Error al obtener los operandores: " . $e->getMessage();
            return [];
        }
    }
}
