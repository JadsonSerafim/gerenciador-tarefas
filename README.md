# 📝 Gerenciador de Tarefas

Um projeto simples de um Gerenciador de Tarefas (To-Do List) full-stack. A aplicação permite aos usuários criar, visualizar, concluir e deletar tarefas, com interação dinâmica no frontend graças ao jQuery e uma API RESTful no backend construída com PHP.


## ✨ Funcionalidades

- ✅ **Adicionar** novas tarefas com título e descrição.
- 📋 **Visualizar** a lista de tarefas pendentes.
- 🗂️ **Visualizar** a lista de tarefas já concluídas.
- ✔️ **Marcar** tarefas como concluídas.
- ❌ **Deletar** tarefas.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

#### **Frontend**
- HTML5
- CSS3
- **Bootstrap 5** (para o layout e componentes)
- **JavaScript**
- **jQuery** (para manipulação do DOM e requisições AJAX)

#### **Backend**
- **PHP 8+**
- **Composer** (para gerenciamento de dependências)
- **Bramus Router** (para o roteamento de API)
- **PDO** (para uma conexão segura com o banco de dados)

#### **Banco de Dados**
- **MySQL**

---

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Git](https://git-scm.com)
* [PHP](https://www.php.net/) (recomendo usar um ambiente local como [XAMPP](https://www.apachefriends.org/pt_br/index.html) ou WAMP)
* [Composer](https://getcomposer.org/)

---

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/JadsonSerafim/gerenciador-tarefas.git](https://github.com/JadsonSerafim/gerenciador-tarefas)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    C:\xampp\htdocs\gerenciador-tarefas
    ```

3.  **Instale as dependências do PHP:**
    ```bash
    composer install
    ```

4.  **Configure o Banco de Dados:**
    - Crie um novo banco de dados no seu MySQL (pelo phpMyAdmin, por exemplo). Vamos chamá-lo de `tarefas` SQL: CREATE DATABASE `tarefas`.
    - Importe o arquivo `.sql` com a estrutura da tabela. Se você não tem um, use o código abaixo para criar a tabela `gerenciador_tarefas`:
      ```sql
      CREATE TABLE `gerenciador_tarefas` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `titulo` varchar(255) NOT NULL,
        `descricao` text DEFAULT NULL,
        `concluida` tinyint(1) NOT NULL DEFAULT 0,
        `data_criacao` date NOT NULL DEFAULT current_timestamp(),
        `data_conclusao` date DEFAULT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
      ```

5.  **Configure a Conexão:**
    - Abra o arquivo `src/conexao.php`.
    - Verifique se as credenciais do banco de dados (`$this->host`, `$this->db_name`, `$this->username`, `$this->password`) correspondem às suas.

6.  **Execute o Projeto:**
    - Se estiver usando o XAMPP, mova a pasta do projeto para dentro da pasta `htdocs`.
    - Inicie os módulos Apache e MySQL no painel do XAMPP.
    - Acesse a aplicação pelo navegador no endereço: `http://localhost/gerenciador-tarefas/`

---

## Endpoints da API

A API RESTful segue os seguintes endpoints:

| Método | Endpoint                    | Descrição                                 |
|--------|-----------------------------|-------------------------------------------|
| `GET`    | `/tarefas`                  | Lista todas as tarefas pendentes.         |
| `GET`    | `/tarefas/concluidas`       | Lista todas as tarefas concluídas.        |
| `POST`   | `/tarefas/adicionar`        | Cria uma nova tarefa.                     |
| `PUT`    | `/tarefas/{id}/concluir`    | Marca uma tarefa específica como concluída. |
| `DELETE` | `/tarefas/{id}`             | Deleta uma tarefa específica.             |

---

## ✒️ Autor

Feito por Jadson Serafim.
