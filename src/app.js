const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");
const logger = require("morgan");
const { apilimit, jsonlimit } = require("./configs/rate-limit.json");
const { HttpCode } = require("./helpers/constants");
const { ErrroHandler } = require("./helpers/errorHandler");
require("dotenv").config();

const routerCats = require("./api/cats");
const routerUsers = require("./api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
app.use(express.static(path.join(process.cwd(), AVATARS_OF_USERS)));

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: jsonlimit }));

// only apply to requests that begin with /api/
app.use(
  "/api/",
  rateLimit({
    windowMs: apilimit.windowMs, // за 15 минут
    max: apilimit.max, // максимум 100 запросов
    // message: apilimit.message, можно message но лучше handler
    handler: (req, res, next) => {
      next(
        new ErrroHandler(
          HttpCode.BAD_REQUEST,
          "Вы исчерпали количество запросов"
        )
      );
    },
  })
);

app.use("/api/cats", routerCats);
app.use("/api/users", routerUsers);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `Resorse [${req.url}] not found`,
    data: `Not Found`,
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error",
    code: err.status,
    message: err.message,
    data:
      err.status === HttpCode.INTERNAL_SERVER_ERROR
        ? "INTERNAL SERVER ERROR"
        : err.data,
  });
});

module.exports = app;
