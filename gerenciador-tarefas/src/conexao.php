<?php
// Conexão com o banco de dados

class Conexao {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $dbname = 'tarefas'; 
    private $conexao;

    public function conectar() {
        try {

            $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8";

            $this->conexao = new PDO($dsn, $this->username, $this->password);
            $this->conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conexao;

        } catch (PDOException $e) {
            http_response_code(500);
            header("Content-Type: application/json; charset=UTF-8");

            $resposta_de_erro = [
                'erro' => 'Falha na conexão com o banco de dados.',
                'mensagem_erro' => $e->getMessage()
            ];

            echo json_encode($resposta_de_erro);
            exit();
        }
    }
}
?>
