<?php

include_once './Database.php';

class Calculadora
{
    private $conn;

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

    public function getNumOperando($operacion, $operacionAnterior)
    {
        $valorOperando = "";

        $minLength = min(strlen($operacion), strlen($operacionAnterior));

        for ($i = 0; $i < $minLength; $i++) {
            if ($operacion[$i] != $operacionAnterior[$i]) {
                $valorOperando .= substr($operacion, $i);
                break;
            }
        }
        if (strlen($operacion) > $minLength) {
            $valorOperando .= substr($operacion, $minLength);
        }
        return $valorOperando;
    }



    public function getOperandos($Id)
    {
        try {
            $stmt = $this->conn->prepare('SELECT operandos FROM calculadora WHERE Id = :Id');
            $stmt->bindParams(':Id', $Id);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result && isset($result['operandos'])) {
                return json_decode($result['operandos'], true);
            }
        } catch (PDOException $e) {
            echo 'Error al obtener los operandos: ' . $e->getMessage();
            return [];
        }
    }

    public function getOperaradores($Id)
    {
        try {
            $stmt = $this->conn->prepare('SELECT operadores FROM calculadora WHERE Id = :Id');
            $stmt->conn->bindParams(':Id', $Id);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result && isset($result['operadores'])) {
                return json_decode($result['operadores'], true);
            }

            return [];
        } catch (PDOException $e) {
            echo 'Error al obtener los operandores: ' . $e->getMessage();
            return [];
        }
    }

    public function getOperacionActual($Id)
    {
        try {
            $stmt = $this->conn->prepare('SELECT operacion_actual FROM calculadora WHERE Id = :Id');
            $stmt->bindParams(':Id', $Id);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result && isset($result['operacion_actual'])) {
                return $result['operacion_actual'];
            }

            return '';
        } catch (PDOException $e) {
            echo 'Error al obtener los operandores: ' . $e->getMessage();
            return [];
        }
    }

    public function updateOperacion($operacion, $operandos, $operadores, $Id = null, $resltado = 0)
    {
        try {
            if ($Id) {
                $stmt = $this->conn->prepare('UPDATE calculadora SET operadores = :operadores, operandos = :operandos, operacion_actual = :operacion WHERE Id = :Id');

                $stmt->execute(array(':operadores' => $operadores, ':operandos' => $operandos, ':operacion' => $operacion, ':Id' => $Id));

                return $this->conn->lastInsertId();
            } else if ($resltado) {
                $stmt = $this->conn->prepare('UPDATE calculadora SET operadores = :operadores, operandos = :operandos, operacion_actual = :operacion, resultado WHERE Id = :Id');

                $stmt->execute(array(':operadores' => $operadores, ':operandos' => $operandos, ':operacion' => $operacion, ':Id' => $Id));

                return $this->conn->lastInsertId();
            } else {
                $stmt = $this->conn->prepare('INSERT INTO calculadore(operadores, operandos, operacion_actual, resultado) VALUES (:operadores, :operandos, :operacion, NULL)');
                $stmt->execute(array(':operadores' => $operadores, ':operandos' => $operandos, ':operacion' => $operacion));

                return $this->conn->lastInsertId();
            }
        } catch (PDOException $e) {
            echo 'Error al obtener los operandores: ' . $e->getMessage();
            return NULL;
        }
    }

    public function getHistorial()
    {
        try {
            $stmt = $this->conn->prepare('SELECT operacion, resultado FROM calculadora');
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $result;
        } catch (PDOException $e) {
            echo 'Error al obtener el historial: ' . $e->getMessage();
            return [];
        }
    }

    public function borrarHistorial()
    {
        try {
            $stmt = $this->conn->prepare('TRUNCATE TABLE nombre_de_tu_tabla');
            $stmt->execute();

            return '';
        } catch (PDOException $e) {
            echo 'Error al truncar la tabla: ' . $e->getMessage();
            return $e->getMessage();
        }
    }

    public function limpiar($id)
    {
        try {
            $stmt = $this->conn->prepare('DELETE FROM calculadora WHERE Id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            $registrosEliminados = $stmt->rowCount();

            if ($registrosEliminados > 0) {
                return "";
            } else {
                return"";
            }
        } catch (PDOException $e) {
            echo "Error al eliminar el registro: " . $e->getMessage();
        }
    }

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
}
