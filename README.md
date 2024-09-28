# Free Fraud API

## Starting Development

- First clone the repo
- Copy the .env-dist to .env

```
cp .env-dist .env
```

- Install the packages

```
npm i
```

- Run Mongo with docker-compose
  You should have docker running

```
docker compose up
```

- After installed everything and mongo running, just run the application

```
npm run start:dev
```

- Then just visit in the browser the swagger
  https://localhost:3000/swagger
