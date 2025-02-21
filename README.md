# API de Gestão de Usuários com Node.js

Este repositório apresenta o desenvolvimento de uma API REST para gestão de usuários utilizando **Node.js**, seguindo a arquitetura **MVC** e aplicando boas práticas de desenvolvimento, como **Middlewares**, **autenticação JWT**, **upload de arquivos com Multer** e **filas de processamento assíncrono**.

## 🚀 Funcionalidades
- ✅ Padrão RESTful para organização e padronização da API
- ✅ Sucrase para suporte a import/export no Node.js
- ✅ Nodemon para recarregamento automático do servidor durante o desenvolvimento
- ✅ Insomnia para teste e visualização rápida das requisições
- ✅ Arquitetura MVC para uma organização modular do código
- ✅ Middlewares para interceptação e tratamento de requisições
- ✅ Autenticação JWT para segurança das APIs
- ✅ Upload de arquivos e fotos com Multer
- ✅ Filas de processamento assíncronas com Redis
- ✅ ESLint e Prettier para padronização e qualidade do código
- ✅ pgAdmin4 para gerenciamento do banco de dados PostgreSQL
- ✅ Dotenv para gerenciamento seguro de variáveis de ambiente

## Tecnologias Utilizadas
- **Node.js** – Ambiente de execução JavaScript no servidor
- **Express.js** – Framework para criação da API
- **Multer** – Middleware para upload de arquivos
- **JWT (JSON Web Token)** – Autenticação segura de usuários
- **Redis** – Gerenciamento de filas para processamento assíncrono
- **PostgreSQL** – Banco de dados relacional
- **pgAdmin4** – Interface para administração do PostgreSQL

## 📁 Estrutura do Projeto
O projeto segue uma estrutura modular organizada para facilitar a manutenção e escalabilidade. Abaixo está o detalhamento dos diretórios e arquivos principais.
```
/project
│-- .vscode/
│   ├── settings.json
│-- src/
│   ├── app/
│   │   ├── controllers/        # Controladores que gerenciam requisições e respostas
│   │   │   ├── ContactsController.js
│   │   │   ├── CustomersController.js
│   │   │   ├── FilesController.js
│   │   │   ├── SessionsController.js
│   │   │   ├── UsersController.js
│   │   ├── jobs/               # Processos assíncronos (filas)
│   │   │   ├── DummyJob.js
│   │   │   ├── WelcomeEmailJob.js
│   │   ├── middlewares/        # Middlewares para requisições
│   │   │   ├── auth.js
│   │   ├── models/             # Modelos do banco de dados
│   │   │   ├── Contact.js
│   │   │   ├── Customer.js
│   │   │   ├── File.js
│   │   │   ├── User.js
│   ├── config/                 # Configurações do projeto
│   │   ├── auth.js
│   │   ├── database.js
│   │   ├── mail.js
│   │   ├── multer.js
│   │   ├── redis.js
│   │   ├── sentry.js
│   ├── database/               # Banco de dados e migrações
│   │   ├── index.js
│   │   ├── migrations/
│   │   │   ├── 20250129153918-create-customers.js
│   │   │   ├── 20250203225517-create-contacts.js
│   │   │   ├── 20250203234452-create-users.js
│   │   │   ├── 20250210123823-remove-provider-users.js
│   │   │   ├── 20250210145500-add-status-customers.js
│   │   │   ├── 20250210180642-add-status-contacts.js
│   │   │   ├── 20250220185700-create-files.js
│   │   │   ├── 20250220201935-add-file-users.js
│   ├── lib/                    # Bibliotecas auxiliares
│   │   ├── Mail.js
│   │   ├── Queue.js
│   ├── routes.js                # Rotas da aplicação
│   ├── server.js                # Inicialização do servidor Express
│   ├── app.js                   # Configuração da aplicação
│   ├── instrument.js            # Monitoramento de erros via Sentry
│   ├── queue.js                 # Configuração das filas de jobs
│-- .env                         # Variáveis de ambiente
│-- .editorconfig                # Configuração de formatação do código
│-- .gitignore                   # Arquivos ignorados pelo Git
│-- .prettierrc                  # Configuração do Prettier
│-- .sequelizerc                 # Configuração do Sequelize CLI
│-- eslint.config.mjs            # Configuração do ESLint
│-- package.json                 # Dependências e scripts do projeto
│-- README.md                    # Documentação do projeto

```
## 📂 Descrição dos Diretórios e Arquivos

### 🚀 `src/` (Código Principal)

- **`app/`** → Contém a lógica principal da aplicação.
  - **`controllers/`** → Gerencia requisições HTTP.
      - **`ContactsController.js`** → Gerencia operações CRUD de contatos
      - **`CustomersController.js`** → Gerencia operações CRUD de clientes.
      - **`FilesController.js`** → Controla uploads e manipulação de arquivos.
      - **`SessionsController.js`** → Gerencia autenticação e login.
      - **`UsersController.js`** → Gerencia operações CRUD de usuários.
  - **`jobs/`** → Processos assíncronos (filas de tarefas).
      - **`DummyJob.js.js`** → Exemplo de job que imprime uma mensagem no console.
      - **`WelcomeEmailJob.js`** → Envia um e-mail de boas-vindas para novos usuários.
  - **`middlewares/`** → Interceptores de requisições.
      - **`auth.js`** → Middleware que valida tokens JWT para autenticação.
  - **`models/`** → Modelos do banco de dados.
      - **`Contact.js`** → Modelo da tabela de contatos.
      - **`Customer.js`** → Modelo da tabela de clientes.
      - **`File.js`** → Modelo da tabela de arquivos.
      - **`User.js`** → Modelo da tabela de usuários.

- ### ⚙ **`config/`** → Arquivos de configuração.
    - **`auth.js`** → Configurações de autenticação JWT.
    - **`database.js`** → Configurações da conexão com o banco de dados.
    - **`mail.js`** → Configurações do serviço de envio de e-mails.
    - **`multer.js`** → Configuração de upload de arquivos.
    - **`redis.js`** → Configurações da fila Redis.
    - **`sentry.js`** → Configuração do Sentry para monitoramento de erros.
- ### 🗄 **`database/`** → Gerenciamento do banco de dados e migrações.
    - **`index.js`** → Inicializa a conexão com o banco de dados.
    - **`migrations/`** → Scripts que criam ou alteram tabelas do banco de dados.
        - **Exemplo:** **` 20250210145500-add-status-customers.js`** adiciona a coluna **`status`** na tabela de clientes.
- ### 📚 **`lib/`** → Bibliotecas auxiliares.
    - **`Mail.js`** → Configura e envia e-mails usando o Nodemailer.
    - **`Queue.js`** → Gerencia filas de jobs usando Bee-Queue.
- ### 📌 **Arquivos Principais**
    - **`routes.js`** → Define as rotas da API e seus controladores.
    - **`server.js`** → Inicia o servidor Express.
    - **`app.js`** → Configura a aplicação, incluindo middlewares, rotas e tratamento de erros.
    - **`instrument.js`** → Configura o Sentry para monitoramento de erros.
    - **`queue.js`** → Inicializa a fila de processamento de jobs.

## 📑 Configuração e Utilitários

- **`.env`** → Variáveis de ambiente (credenciais, API keys, configurações).
- **`.gitignore`** → Define arquivos que o Git deve ignorar.
- **`.prettierrc`** → Regras de formatação do código com Prettier.
- **`.sequelizerc`** → Configuração do Sequelize CLI.
- **`eslint.config.mjs`** → Regras de linting para padronização do código.
- **`package.json`** → Dependências e scripts do projeto.
- **`README.md`** → Documentação geral do projeto.

## 🎯 Resumo das Funcionalidades

- ✅ **Controllers** → Gerenciam requisições HTTP. 
- ✅ **Jobs** → Executam tarefas assíncronas.
- ✅ **Middlewares** → Interceptam requisições.
- ✅ **Models** → Estrutura do banco de dados.
- ✅ **Configurações** → Definem parâmetros globais.
- ✅ **Rotas** → Definem os endpoints da API.
- ✅ **Servidor** → Inicia e configura o Express.

🚀 **Esse projeto foi estruturado para garantir clareza, escalabilidade e facilidade de manutenção!**

## Contato

Desenvolvido por Fabio Henrique.

Se quiser saber mais ou colaborar, entre em contato:
[LinkedIn](https://www.linkedin.com/in/fabio-henrique-1608bb1b5/) | [Email](fabiohvp2012@gmail.com)

