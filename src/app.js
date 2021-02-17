const express = require("express");
const cors = require("cors");
const { HttpCode } = require("./helpers/constants");
const routerCats = require("./api/cats");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cats", routerCats);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `Use api onroutes ${req.baseUrl}/api/cats`,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`);
});
