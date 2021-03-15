const { ErrroHandler } = require("../helpers/errorHandler");
const { HttpCode } = require("../helpers/constants");

module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    next(new ErrroHandler(HttpCode.BAD_REQUEST, "Field avatar empty"));
  }
  next();
};
