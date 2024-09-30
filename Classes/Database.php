<?php
class Database
{
    private static $conn = null;

    public static function getConnection()
    {
        if (self::$conn == null) {
            $host = 'localhost';
            $db_name = 'calculadora';
            $username = 'root';
            $password = '';

            try {
                $dsn = "mysql:host=" . $host . ";dbname=" . $db_name;
                self::$conn = new PDO($dsn, $username, $password);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo "Error en la conexión: " . $e->getMessage();
            }
        }

        return self::$conn;
    }

    public static function closeConnection()
    {
        if (self::$conn !== null) {
            self::$conn = null;
            echo "Conexión cerrada\n";
        }
    }
}
?>

