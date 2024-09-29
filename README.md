# Free Fraud API

## Runing using our APIs
![plugin-example](https://github.com/user-attachments/assets/e76c45aa-f36a-4fe9-96d1-3f8f362ca378)

## Swagger
https://fraud-free-api.onrender.com/swagger#/

![swegger-ex](https://github.com/user-attachments/assets/5a6fb570-9997-412b-bc45-e38fad9ab711)


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
