# 🛡️ FraudFree API

If you're looking the frontend, go [here](https://github.com/HackYeahKabanosy/fraud-free-webapp)

## Runing using our APIs
![plugin-example](https://github.com/user-attachments/assets/e76c45aa-f36a-4fe9-96d1-3f8f362ca378)

## Getting raw data
run our model that generates the conclusion about the shops/e-commerces, curl example:
```
curl -X 'GET' \
  'https://fraud-free-api.onrender.com/Conclusion?url=amazon.com' \
  -H 'accept: */*'
```

## Swagger
https://fraud-free-api.onrender.com/swagger#/

![swegger-ex](https://github.com/user-attachments/assets/5a6fb570-9997-412b-bc45-e38fad9ab711)

## Installing extension on Chrome

Watch the [Youtube video](https://youtu.be/dTMOsUeuzEg)
1. Click on manage extension
2. Load unpacked
3. Find our [folder](https://github.com/HackYeahKabanosy/fraudfree/tree/main/browser_plugin/mozilla)

## Installing extension on Firefox

Watch the [Youtube video](https://youtu.be/g39z8EUkI6Y)

1. Click on manage extension
2. Load unpacked
3. Find our zip [folder](https://github.com/HackYeahKabanosy/fraudfree/tree/main/browser_plugin/mozilla)


## 🛠️ Tech Stack

- **Next.js** - A powerful React framework for building dynamic web applications.
- **TailwindCSS** - A utility-first CSS framework for fast UI development.
- **Framer Motion** - For smooth animations.
- **NestJS** - Powerfull API, check the [api on github](https://github.com/HackYeahKabanosy/fraudfree).
- **Vanilla JS** - The tasty way to create our plugin for chrome and firefox, [check on github](https://github.com/HackYeahKabanosy/fraudfree/tree/main/browser_plugin/mozilla).
- **MongoDB** - A NoSQL database for storing website information.

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

  
