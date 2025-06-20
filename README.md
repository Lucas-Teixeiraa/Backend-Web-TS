# TestTecBackend

Backend para o projeto TestTec, focado no gerenciamento de usuários e seus contatos.

## Visão Geral

Este projeto implementa um backend utilizando Node.js e Prisma ORM para interagir com um banco de dados PostgreSQL. Ele fornece a base para operações CRUD (Criar, Ler, Atualizar, Deletar) relacionadas a usuários e seus respectivos contatos.

## Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução JavaScript no lado do servidor.
*   **Prisma:** ORM (Object-Relational Mapper) para interagir com o banco de dados de forma type-safe.
*   **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.

## Estrutura do Banco de Dados (Modelos Prisma)

O esquema do banco de dados é definido no arquivo `prisma/schema.prisma` e consiste nos seguintes modelos:

### `User`

*   `id`: `String` (Chave primária, UUID)
*   `email`: `String` (Único)
*   `name`: `String`
*   `createdAt`: `DateTime` (Data de criação)
*   `updatedAt`: `DateTime` (Data da última atualização)
*   `contact`: `contact[]` (Lista de contatos associados)

### `contact`

*   `id`: `String` (Chave primária, UUID)
*   `name`: `String`
*   `email`: `String`
*   `phone`: `String`
*   `userId`: `String` (Chave estrangeira para `User`)
*   `user`: `User` (Relação com o modelo `User`)

## Configuração e Instalação

### Pré-requisitos

*   Node.js (versão recomendada: LTS)
*   NPM ou Yarn
*   PostgreSQL instalado e em execução

### Passos para Configuração

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd TestTecBackend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no exemplo abaixo. Este arquivo é ignorado pelo Git (conforme `.gitignore`).

    ```env
    # .env
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@SEU_HOST:SUA_PORTA/SEU_BANCO_DE_DADOS"
    ```
    Substitua `SEU_USUARIO`, `SUA_SENHA`, `SEU_HOST`, `SUA_PORTA`, e `SEU_BANCO_DE_DADOS` com as suas credenciais do PostgreSQL.

4.  **Execute as Migrações do Prisma:**
    Isso criará as tabelas no seu banco de dados com base no `schema.prisma`.
    ```bash
    npx prisma migrate dev --name init
    ```
    (O nome `init` para a migração é apenas um exemplo, você pode usar outro se preferir).

5.  **Gere o Prisma Client:**
    O Prisma Client é gerado automaticamente após as migrações, mas se precisar regerá-lo manualmente:
    ```bash
    npx prisma generate
    ```
