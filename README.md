# node-js-goit-lessons

## Node 21+22. Модуль 2 Занятие 3 Express. 16.02.21

```text
npm init -y
```

```text
npm install express -E
```

```text
npm i nodemon -DE
```

### Точка входа app.js с [Hello world example](https://expressjs.com/en/starter/hello-world.html).

Вынести старт сервера в отдельное место.

[express-router](https://expressjs.com/en/guide/routing.html#express-router)

---

### Ставим [morgan](https://www.npmjs.com/package/morgan). Для логирования запросов в консольке (и подключить в app.js)

```text
npm i morgan -E
```

---

### Ставим ["Human-friendly and powerful HTTP request library for Node.js"](https://www.npmjs.com/package/got)

![alt GOT](https://raw.githubusercontent.com/sindresorhus/got/HEAD/media/logo.svg)

```text
npm install got@latest -E
```

---

### Ставим dotenv ["from a .env file into process.env"](https://www.npmjs.com/package/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
>(Короче грузит переменные из файла .env в process.env )

![alt dotenv](https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png)

```text
npm i dotenv -E
```

---

### Ставим express-validator ["An express.js middleware for validator."](https://www.npmjs.com/package/express-validator)

```text
npm i express-validator -E
```

```js
const { query, validationResult } = require('express-validator');

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next()
}

router.get("/",
  [
    query('lat').isNumeric(),
    query('lon').isNumeric()
  ],
  validator,
  async (req, res, next) => {
    const { lat, lon } = req.query;
    .....
  }
)
```

---

### В уроке используется [openweathermap api](https://openweathermap.org/api)

By geographic coordinates

```text
http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
```

![alt openweathermap](https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png)

---

### В app.js добавить обработчик ошибок [Writing error handlers](https://expressjs.com/en/guide/error-handling.html#writing-error-handlers)

Обязательно 4 параметра! Пример:

```js
app.use((err, _req, res, _next) => {
  res.status(500).send({ message: err.message })
})
```

---

## Деплой на [Heroku](https://www.heroku.com/):

1. Регистрация
2. Поставить [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

Deploy using Heroku Git

```text
heroku login
```

Уже должен существовать .git репозиторий

```text
heroku git:remote -a node-js-goit-lesson-03-weather
```

Если работал в ветке то сначала pullrequest в main

```text
git add .
git commit -am 'heroku deploy'
git push heroku main
```

Установка ключа в настройках приложения на Heroku

1. Settings
2. Config Vars

[Установка ключа через CLI](https://devcenter.heroku.com/articles/config-vars#managing-config-vars)

```text
heroku config:set API_KEY=7d94fde1168a4612350e24e49fcd639b
```

[node-js-goit-lesson-03-weather](https://node-js-goit-lesson-03-weather.herokuapp.com/)

[/weather?lat=50.44950&lon=30.52550](https://node-js-goit-lesson-03-weather.herokuapp.com/weather?lat=50.44950&lon=30.52550)

---

***О себе**: "С детства с дизайном я дружу"*
