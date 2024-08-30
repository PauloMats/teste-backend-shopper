# Shopper API

Esta é uma API REST desenvolvida para gerenciar a leitura individualizada de consumo de água e gás. Utiliza inteligência artificial para processar imagens de medidores e armazenar as medições em um banco de dados SQLite.

## Requisitos

- **Node.js** (versão 18 ou superior)
- **Docker** (para a execução em contêineres)

## Funcionalidades

A API possui os seguintes endpoints:

### 1. `POST /upload`

Recebe uma imagem em base64, consulta uma API externa (Gemini) e retorna a medida lida.

**Request Body:**

{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}

Response Body:

200 OK:


{
  "image_url": "string",
  "measure_value": integer,
  "measure_uuid": "string"
}
400 Bad Request:

{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
409 Conflict:

{
  "error_code": "DOUBLE_REPORT",
  "error_description": "Leitura do mês já realizada"
}

2. PATCH /confirm
Confirma ou corrige o valor lido pelo LLM.

Request Body:


{
  "measure_uuid": "string",
  "confirmed_value": integer
}
Response Body:

200 OK:

{
  "success": true
}
400 Bad Request:

{
  "error_code": "INVALID_DATA",
  "error_description": "<descrição do erro>"
}
404 Not Foun

{
  "error_code": "MEASURE_NOT_FOUND",
  "error_description": "Leitura não encontrada"
}
409 Conflic

{
  "error_code": "CONFIRMATION_DUPLICATE",
  "error_description": "Leitura já confirmada"
}
3. GET /<customer_code>/list
Lista as medidas realizadas por um cliente.

Query Parameters:

measure_type (opcional): "WATER" ou "GAS"
Response Body:

200 

{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": boolean,
      "image_url": "string"
    }
  ]
}
400 Bad Request

{
  "error_code": "INVALID_TYPE",
  "error_description": "Tipo de medição não permitida"
}
404 Not Found

{
  "error_code": "MEASURES_NOT_FOUND",
  "error_description": "Nenhuma leitura encontrada"
}

## Configuração do Ambiente
Clonar o Repositório:


git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>

Instalar Dependências:

npm install

## Configuração do Ambiente com Docker:

Criar o arquivo .env:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

GEMINI_API_KEY=<chave_da_API>


## Executar a Aplicação com Docker Compose:

docker-compose up --build

Isso irá construir as imagens necessárias e iniciar os containers para a aplicação e o banco de dados.

## Migrations e Seeds
Executar Migrations:

As migrations são automaticamente executadas ao iniciar a aplicação com Docker. Caso precise rodar manualmente, use:

npx knex migrate:latest --knexfile knexfile.ts
Seeds (se necessário):

Crie e execute seeds conforme necessário para popular o banco de dados.