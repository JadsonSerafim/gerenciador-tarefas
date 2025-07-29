<?php // Permite acesso das requisições do frontend, problemas se retirar!
header('Access-Control-Allow-Origin: http://localhost/gerenciador-tarefas/app_public/#');
header('Content-Type: application/json');
require '../vendor/autoload.php';
require 'conexao.php';

$conexao = new Conexao();
$pdo = $conexao->conectar();

$router = new \Bramus\Router\Router();
// Garante a rota certa
$router->setBasePath('/gerenciador-tarefas/src'); 

/*Rota de teste para ver se a API está online, use para testes rápidos em caso de problemas. 

$router->get('/', function() {
    echo json_encode(['mensagem' => 'API do Gerenciador de Tarefas está funcionando!']);
}); */



// listar todas as tarefas pendentes
$router->get('/tarefas', function() use ($pdo) {
    try {
        $sql = "SELECT id, titulo, descricao, DATE_FORMAT(data_criacao, '%d/%m/%Y') as dataFormatada FROM gerenciador_tarefas WHERE concluida = 0 ORDER BY data_criacao DESC";
        $stmt = $pdo->query($sql);
        $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tarefas);
    } catch(\PDOException $e) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao listar tarefas: ' . $e->getMessage()]);
    }
});
//listar todas as tarefas concluídas
$router->get('/tarefas/concluidas', function() use ($pdo) {
    try {
        $sql = "SELECT id, titulo, descricao, DATE_FORMAT(data_conclusao, '%d/%m/%Y') as dataConclusao FROM gerenciador_tarefas WHERE concluida = 1 ORDER BY data_criacao DESC";
        $stmt = $pdo->query($sql);
        $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tarefas);
    } catch(\PDOException $e) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao listar tarefas: ' . $e->getMessage()]);
    }
});




// criar uma nova tarefa
$router->post('/tarefas/adicionar', function() use ($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['titulo']) || empty($data['titulo'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'O título é obrigatório.']);
        return;
    }

    try {
        $sql = 'INSERT INTO gerenciador_tarefas (titulo, descricao) VALUES (:titulo, :descricao)';
        $stmt = $pdo->prepare($sql);
        
        $titulo = $data['titulo'];
        $descricao = $data['descricao'] ?? null;

        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->execute();
        
        http_response_code(201);
        echo json_encode(['mensagem' => 'Tarefa criada com sucesso', 'id' => $pdo->lastInsertId()]);

    } catch(\PDOException $e) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao criar tarefa: ' . $e->getMessage()]);
    }
});

//Tornar a tarefa como concluida
$router->put('/tarefas/(\d+)/concluir', function($id) use ($pdo) {
    try {
        $sql = 'UPDATE gerenciador_tarefas SET concluida = 1, data_conclusao = NOW() WHERE id = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['mensagem' => 'Tarefa marcada como concluída.']);
        } else {
            http_response_code(404);
            echo json_encode(['erro' => 'Tarefa não encontrada ou tarefa já estava concluída.']);
        } 
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao atualizar tarefa: ' . $e->getMessage()]);
    }
});

//deletar uma tarefa
$router->delete('/tarefas/(\d+)', function($id) use ($pdo) {
    try {
        $sql = 'DELETE FROM gerenciador_tarefas WHERE id = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['mensagem' => 'Tarefa excluída com sucesso']);
        } else {
            http_response_code(404);
            echo json_encode(['erro' => 'Tarefa não encontrada']);
        }
    } catch(\PDOException $e) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao excluir tarefa: ' . $e->getMessage()]);
    }
});

// Executa o roteador
$router->run();