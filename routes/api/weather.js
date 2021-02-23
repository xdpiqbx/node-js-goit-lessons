const express = require("express");
const got = require("got");
// const { body, query, param, validationResult } = require('express-validator');
const { query, validationResult } = require('express-validator');
// GET
//'/contact/:id' --- req.params.id
//'/contact?skip=0&limit=10' --- req.query

// POST, PUT и PATCH
// Content-Type: application/x-www-form-urlencoded
// для получения данных из форм --- req.body
// предварительно -> app.use(express.urlencoded({ extended: false }))
// false - результат парсинга будет набор пар ключ: значение ( '' || [] )
// true - парсер использует другую библиотеку для разбора формата строки

// Передача JSON тоже req.body
// Content-Type: application/json
// app.use(express.json())
// const { email, password } = req.body

const router = express.Router();
require("dotenv").config();

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next()
}

// define the home page route
router.get("/",
  [
    query('lat').isNumeric(),
    query('lon').isNumeric()
  ],
  validator,
  async (req, res, next) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.API_KEY;
    try {
      const response = await got(
        "http://api.openweathermap.org/data/2.5/weather",
        {
          searchParams: {
            lat,
            lon,
            appid: apiKey,
          },
        }
      )
      const {weather, wind, name} = JSON.parse(response.body)
      res.json({weather: weather[0], wind, name});
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
