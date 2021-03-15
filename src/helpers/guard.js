const passport = require("passport");
require("../configs/passport");
const { HttpCode } = require("../helpers/constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    //этот callback это done из passport js
    // console.log(req.get("Authorization"));
    // const [, token] = req.get("Authorization").split(" ");
    const token = req.get("Authorization")?.split(" ")[1];
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
