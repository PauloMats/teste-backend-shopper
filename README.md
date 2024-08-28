# Shopper API

Esta é uma API REST desenvolvida para gerenciar a leitura individualizada de consumo de água e gás. Utiliza inteligência artificial para processar imagens de medidores e armazenar as medições em um banco de dados SQLite.

## Requisitos

- **Node.js** (versão 18 ou superior)
- **Docker** (para a execução em contêineres)

## Funcionalidades

A API possui os seguintes endpoints:

### 1. `POST /upload`

Recebe uma imagem em base64, consulta uma API externa (Gemini) e retorna a medida lida.
