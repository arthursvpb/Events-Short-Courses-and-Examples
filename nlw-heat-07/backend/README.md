# Node Heat Back-end

## Prisma

ORM que está sendo bastante difundida no mercado

```
yarn add prisma -D
yarn prisma init
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