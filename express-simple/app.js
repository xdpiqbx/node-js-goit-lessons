const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan"); // логирование запросов на сервер

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const contactRouter = require("./routes/contact");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); // где лежат шаблоны
app.set("view engine", "ejs"); // какой движок используем

process.env.NODE_ENV === "development"
  ? app.use(logger("dev"))
  : app.use(logger("short"));

// Есть 2 подхода передачи данных на сервер
app.use(express.json()); // передача json
app.use(express.urlencoded({ extended: false })); // если есть загрузка формы

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public"))); // подключаем статику (всё что лежит в public)

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/contact", contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
