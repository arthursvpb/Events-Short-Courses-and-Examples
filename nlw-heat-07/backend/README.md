# Node Heat Back-end

#RumoAoPróximoNível

## Prisma

ORM que está sendo bastante difundida no mercado

```
yarn add prisma -D
yarn prisma init
yarn prisma studio
```

## Auto Reload

No `package.json`

```json
"scripts": {
    "dev": "ts-node-dev --exit-child src/app.ts"
},
```

### Migrations

```sh
yarn prisma migrate dev
```

## Github OAuth

Gerar um novo app OAuth no [Github Developers](https://github.com/settings/developers) e pegar os dados de `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`

## Classe default de erros

- Express precisa da seguinte biblioteca

```
yarn add express-async-errors
```

## Socket.io

Biblioteca para real time (WebSockets)

- Protocolo `HTTP`: Conexão feita conforme request e response
- Protocolo `WebSocket`: Conexão feita a todo tempo que só é fechada se uma das partes desconectar

```sh
yarn add socket.io
```
