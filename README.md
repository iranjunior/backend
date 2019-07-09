# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Erros encontrados pelo caminho


Relation "...." already exists 

Esse erro era apresentado quando o este comando era executado :

```js
adonis migration:run
```

Para resolver precisei apenas tirar o o atributo .index de campo que estava apresentando erro
