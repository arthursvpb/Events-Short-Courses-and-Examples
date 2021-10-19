# Class Notes

## Class 01

### Start

```sh
yarn init -y
```

### Typescript

```sh
yarn add typescript -D
yarn tsc --init
yarn tsc

yarn add ts-node-dev -D
```

## Class 02

### Ways of using DB

1. Native Driver -> Consultas nativas
2. Query Builder -> Contrutor de queries
3. ORM -> Mapeamento objeto - entidade

### Clean Architecture and SOLID

Entity -> Tabelas do banco de dados
Repository -> Acesso ao banco de dados
Service -> Regras de negócio
Controller -> Lidar com requisição e resposta

```sh
yarn add typeorm reflect-metadata sqlite3
```

### Create migration

```sh
yarn typeorm migration:create -n CreateUsers
```

### Run or revert migration

```sh
yarn typeorm migration:run
yarn typeorm migration:revert
```

### Create entities

```sh
yarn typeorm entity:create -n User
```

## Class 03

### Handling errors using middlewares

`throw new Error` -> Lança uma exceção para camada a cima

- Fluxo:
  - `Server -> Routes -> Controller -> Service`

Podemos colocar handling de erros na camada de server para lidar com um projeto grande

- Express precisa de uma biblioteca para lidar com erros async

```sh
yarn add express-async-errors

```

## Class 04

### What to do when we forgot some column in table

```sh
yarn typeorm migration:create -n AlterUserAddPassword
```

## Class 05

### Overwrite types that doesn't exist in a library

Folder: `src/@types/express/index.d.ts`

```ts
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
```

Class-transformer -> Transformar uma classe

```sh
yarn add class-transformer
```

## Ideas to make it to the next level

- Classe de erro customizável (classe Handler para capturar erros)
- Nomes customizados para -> tags com hashtag, icones, etc.
- Enviar e-mail quando receber um compliment
- Colocar em produção (Heroku, Amazon, Digital Ocean)
- Criar um front-end
- Refatorar com conceitos do SOLID, criar modulos, etc.
- Usar Postgres alterando o `.ormconfig`
