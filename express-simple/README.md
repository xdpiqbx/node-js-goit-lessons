# node-js-goit-lessons

## [Express application generator](https://expressjs.com/en/starter/generator.html)

```text
npx express-generator --view=ejs express-simple
```

```text
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

```text
var ---to---> const
```

```text
npm install
```

```text
npm install nodemon -DE
```
```text
  "nodemonConfig": {
    "ignore":[
      "model/*.*"
    ],
    "delay": "2500"
  }
```

> Позволят переменные окружения пробрасывать в зависимости от системы

```text
npm i cross-env -E
```
