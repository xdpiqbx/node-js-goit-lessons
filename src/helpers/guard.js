const passport = require("passport");
require("../configs/passport");
const { HttpCode } = require("../helpers/constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    //этот callback это done из passport js
    const [, token] = req.get("Authorization").split(" ");
    if (error || !user || token !== user.token) {
      return next({
        status: HttpCode.FORBIDEN,
        message: "FORBIDDEN",
      });
    }
    req.user = user;
    // res.locals.user = user - так хочет express (это будет локальная переменная)
    // req.app.locals.user = user - это будет глобальная переменная
    return next();
  })(req, res, next);
  // next();
};

module.exports = guard;