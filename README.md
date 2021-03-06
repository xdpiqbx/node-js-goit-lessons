# [node-js-goit-lessons](https://youtu.be/jwX1dIC--mM?t=72)

## [Node.js 20] Занятие 7. Аутентификация. 23.11

---

```npm
npm i bcryptjs jsonwebtoken passport passport-jwt
```

---

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [passport](https://www.npmjs.com/package/passport)
- [passport-jwt (npm)](https://www.npmjs.com/package/passport-jwt)
- [passport-jwt (official)](http://www.passportjs.org/packages/passport-jwt/)

---

[jwt.io](https://jwt.io/)

[debugger](https://jwt.io/#debugger-io)

```jwt
Encoded

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

```jwt
Decoded

HEADER:ALGORITHM & TOKEN TYPE
{
  "alg": "HS256",
  "typ": "JWT"
}

PAYLOAD:DATA
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

VERIFY SIGNATURE
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret-word
)
```

---

```js
schCat.js

const catSchema = new Schema(
  {
...
    owner: {
      type: mogoose.schemaTypes.ObjectId,
      ref: "user",
    },
  },
...
);
```

---

```js
schUser.js;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
SALT_FACTOR = 6;
const { Schema, model } = mongoose;

const { Sex } = require("../../helpers/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      default: "Guest",
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "This gender isn't allowed",
      },
      default: Sex.NONE,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true, //createdAt and updatedAt
  }
);

// hook .pre
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
module.exports = User;
```

---

Как JOIN

```js

  .populate({
      path: "owner", // по полю owner
      select: "name email sex", // и сам SELECT name, email, sex
    });

  async getAll(userId) {
    const results = await Cat.find({ owner: userId }).populate({
      path: "owner",
      select: "name email sex",
    });
    return results;
  }
```

---

Так можно вытаскивать Heders

```js
const [, token] = req.get("Authorization").split(" ");
```

---

- Установка mongoose
- Подключение к базе через mongoose
- Создание схемы
- [Виртуальное поле](https://mongoosejs.com/docs/guide.html#virtuals)
- Создание сниппетов

---

> ## ORM - Object-relational mapping (для реляционных БД)

---

Prisma

<a href="https://www.prisma.io/docs/" alt="prisma">
<svg height="50" class="logo" viewBox="0 0 90 24" fill="#CCC" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="logoTitle"><path fill-rule="evenodd" clip-rule="evenodd" d="M34.736 11.947h.9c.842 0 1.471-.168 1.89-.502.417-.335.626-.822.626-1.462 0-.645-.175-1.122-.525-1.43-.35-.308-.899-.462-1.646-.462h-1.245v3.856zm6.179-2.061c0 1.398-.434 2.466-1.303 3.206-.867.741-2.101 1.11-3.702 1.11h-1.174v4.62H32V5.835h4.122c1.565 0 2.755.34 3.57 1.017.815.678 1.223 1.69 1.223 3.034zM48.167 8.704c.365 0 .668.027.91.08l-.203 2.54a3.08 3.08 0 00-.795-.088c-.859 0-1.528.222-2.008.666-.48.444-.72 1.066-.72 1.866v5.054H42.66V8.891h2.039l.397 1.67h.132a3.726 3.726 0 011.24-1.346c.521-.34 1.087-.51 1.7-.51zM50.505 18.822h2.692V8.891h-2.692v9.931zM50.39 6.323c0-.882.489-1.323 1.465-1.323.977 0 1.466.441 1.466 1.323 0 .421-.122.748-.366.982-.245.234-.611.35-1.1.35-.976 0-1.465-.443-1.465-1.332zM62.675 15.873c0 1.019-.352 1.795-1.055 2.328-.703.532-1.755.799-3.155.799-.719 0-1.33-.049-1.836-.147a6.904 6.904 0 01-1.421-.43v-2.24c.5.238 1.063.436 1.69.596.627.16 1.178.24 1.655.24.977 0 1.465-.284 1.465-.853a.715.715 0 00-.194-.52c-.13-.133-.353-.284-.67-.453a16.977 16.977 0 00-1.272-.59c-.759-.32-1.317-.616-1.672-.889a2.488 2.488 0 01-.777-.937c-.162-.352-.243-.786-.243-1.301 0-.883.34-1.565 1.02-2.048.68-.482 1.642-.724 2.89-.724 1.189 0 2.345.261 3.469.782l-.812 1.954a14.913 14.913 0 00-1.386-.524 4.326 4.326 0 00-1.315-.204c-.794 0-1.192.216-1.192.648 0 .243.129.454.384.631.257.178.817.441 1.682.79.77.315 1.336.608 1.695.88.358.273.623.586.794.942.17.355.256.779.256 1.27zM73.34 18.822h-2.693v-5.8c0-.717-.119-1.255-.357-1.613-.238-.358-.613-.537-1.125-.537-.689 0-1.189.254-1.5.764-.313.51-.469 1.347-.469 2.514v4.672h-2.692V8.891h2.057l.362 1.27h.15a2.741 2.741 0 011.147-1.07c.5-.258 1.074-.387 1.722-.387 1.477 0 2.477.486 3 1.457h.239c.265-.462.654-.82 1.17-1.075.514-.255 1.095-.382 1.743-.382 1.118 0 1.964.289 2.537.866.574.578.86 1.503.86 2.776v6.476h-2.7v-5.8c0-.717-.12-1.255-.358-1.613-.238-.358-.613-.537-1.125-.537-.66 0-1.152.237-1.479.71-.326.474-.49 1.226-.49 2.257v4.983zM87.326 14.22l-1.042.036c-.783.024-1.365.166-1.747.427-.383.26-.574.657-.574 1.19 0 .764.435 1.146 1.306 1.146.624 0 1.123-.18 1.496-.542.374-.361.56-.84.56-1.44v-.816zm.794 4.602l-.52-1.35h-.072c-.453.575-.919.973-1.399 1.195-.479.222-1.104.333-1.875.333-.948 0-1.693-.273-2.238-.817-.544-.545-.816-1.32-.816-2.328 0-1.054.366-1.831 1.099-2.332.733-.5 1.837-.777 3.314-.83l1.713-.053v-.436c0-1.006-.512-1.51-1.536-1.51-.789 0-1.716.24-2.78.72l-.892-1.83c1.136-.598 2.395-.898 3.778-.898 1.324 0 2.339.29 3.045.871.706.58 1.059 1.463 1.059 2.647v6.618h-1.88zM18.01 19.037L7.163 22.224a.454.454 0 01-.58-.52L10.46 3.267c.073-.345.552-.4.704-.08l7.173 15.138a.514.514 0 01-.327.713zm1.86-.752L11.562.757a1.333 1.333 0 00-1.136-.755 1.32 1.32 0 00-1.213.626l-9.009 14.5c-.279.451-.273 1.008.016 1.455l4.404 6.778a1.419 1.419 0 001.59.581l12.782-3.756c.392-.116.712-.39.88-.756a1.354 1.354 0 00-.008-1.145z"></path></svg>
</a>

---

Sequelize

<a href="https://sequelize.org/" alt="sequelize"><img src="https://sequelize.org/master/image/brand_logo.png" height="100" alt="sequelize"/></a>

---

TypeORM

<a href="https://typeorm.io/#/" alt="sequelize"><img src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" height="100" alt="sequelize"/></a>

---

> ## ODM - Object Document Mapping (для noSQL БД)

[![mongoose](https://mongoosejs.com//docs/images/mongoose5_62x30_transparent.png) mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js

```text
npm install mongoose -E
```

# [api/query.html](https://mongoosejs.com/docs/api/query.html)

Подключение

```js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

Использование

```js
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});
```

[Connection Events](https://mongoosejs.com/docs/connections.html#connection-events)

```js
mongoose.connection.on('event-title' () => {})
```

Mongoose предоставляет возможность создавать схемы хранимых данных

Схема коллекции

```js
import mongoose from "mongoose";
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Error: Article title is required"],
  },
  body: {
    type: String,
    required: [true, "Error: Article body is required"],
  },
  date: {
    type: Date,
    default: Date.now, // это НЕ правильно! у всех будет одна дата.
    required: [true, "Error: Date is required"],
  },
  author: String,
  comments: [{ body: String, date: Date }],
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

catSchema.virtual("nameAge").get(function () {
  return this.name + " " + this.age;
});

mongoose.model("Blog", BlogSchema);
```

---

> ## Сниппеты (Не ленится писать! чтоб потом ленится =)

File -> Preferences -> User Snippets

Указать для чего создать

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
    "mongoose": "5.11.18",
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
