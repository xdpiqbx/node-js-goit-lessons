const express = require("express");
const got = require("got");
const router = express.Router();
require("dotenv").config();

// define the home page route
router.get("/", async (req, res, next) => {
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
});

module.exports = router;
