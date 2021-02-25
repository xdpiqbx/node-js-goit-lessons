# node-js-goit-lessons

## [Node.js 20] Занятие 5. REST API. MongoDB и Mongoose. 16.11

---

### [Mongo DB](https://www.mongodb.com/) - The database for modern applications

На один проэкт можно создать 1 бесплатный кластер:

```text
512 Mb - Storage
500 max - Connections
100 max - Databases
500 max - Collections
Low network performance
```

---

### [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_ukraine_search_core_brand_atlas_desktop&utm_term=atlas%20mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624575&gclid=Cj0KCQiA7NKBBhDBARIsAHbXCB5RsIbzpZQ-zT8pi6W4Ah-l3Nx1smzxtwD53cnRXRlTz3QcjJbBqU4aAovOEALw_wcB) - Cloud-hosted MongoDB service

---

### [Mongodb compass](https://www.mongodb.com/products/compass) - Desktop GUI for MongoDB

---

### [Robomongo.org](https://robomongo.org/)

---

### [NoSQL Booster](https://nosqlbooster.com/downloads)

---

### [mongodb on npm](https://www.npmjs.com/package/mongodb)

```text
npm i mongodb
```

---

```text
Clusters
  Databases (внутри баз - коллекции)
    Collections (внутри коллекций - документы)
```

---

**Так выглядит документ (запись в базе)**

```text
  _id: ObjectId("6034bbea88ad4825048e8f94")
  name: "MongoCat"
  age: 2
  isVaccinated: false
```

---

**ObjectId в Монго**

```text
_id: ObjectId("5f 15 99 6f bb de 79 3a 10 7a f3 59")
5f 15 99 6f - 4 байта - секунды начиная с последней записи (в 16-ом формате)
bb de 79    - 3 байта - идентификатор машыны
3a 10       - 2 байта - идентификатор процесса
7a f3 59    - 3 байта - случайное значение
```

Так всегда можно узнать время записи (время сервера!)

```js
const { ObjectID } = require("mongodb");
ObjectID(id).getTimestamp();
// id это идентификатор записи созданый mongo при создании записи
```

---

**DB connection**

```js
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = new MongoClient.connect(uriDb, {
  useUnifiedTopology: true,
  poolSize: 5,
  useNewUrlParser: true,
}); // Пока в db лежит промис

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection for DB disconnected and app terminated");
  process.exit(1);
});

module.exports = db;
```

---

Комманды чтения

```js
db.<collection>.find() // Получить все
db.<collection>.find({gender: 'f'}) // Получить по условию
// .find() - всегда возвращает курсор поэтому его надо приводить к массиву

// Например
const results = await this.collection.find({}).toArray();
```

---

Комманды вставки

```js
db.<collection>.insert({name: 'Boris', age: 25})
db.<collection>.insertOne({name: 'Boris', age: 25})
```

---

Комманды изменения

```js
db.<collection>.update({age: 15}, {name: 'Murz'}) // полная замена (replace)
db.<collection>.update({age: 15}, {$set: {name: 'Murz'}}) // полная замена
db.<collection>.updateOne( ... ) // (v 3.2 >)
db.<collection>.update({age: 15}, {$set: {name: 'Murz'}}, {multi: true}) // Множественное обновление
db.<collection>.updateMany( ... ) // Множественное обновление
```

```js
  async update(id, body) {
    const objId = ObjectID(id);
    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objId }, // первый параметр - фильтр (тут ищу по id)
      { $set: body }, // не забывать про $set (иначе перезапишет всю запись)
      { returnOriginal: false } // чтоб не возвращал предидущую запись
    );
    return result;
  }
```

Комманды удаления

```js
db.<collection>.remove({age: 5})
```

---

### Ставим dotenv ["from a .env file into process.env"](https://www.npmjs.com/package/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env

> (Короче грузит переменные из файла .env в process.env )

![alt dotenv](https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png)

```text
npm i dotenv -E
```

---

```json
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "8.2.0",
    "express": "^4.17.1",
    "joi": "^17.4.0",
    "mongodb": "^3.6.4",
    "morgan": "1.10.0"
  },
  "devDependencies": {
    "nodemon": "2.0.7"
  },
  "nodemonConfig": {
    "ignore": [
      "data/*.*"
    ]
  }
```

---
