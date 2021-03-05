const { HttpCode } = require("../helpers/constants");
const { AuthService, UsersService } = require("../services");

const authService = new AuthService();
const usersService = new UsersService();

const registration = async (req, res, next) => {
  const { name, email, password, sex } = req.body;
  const user = await usersService.findByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "This email is already use",
    });
  }
  try {
    const newUser = await usersService.create({ name, email, password, sex });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        sex: newUser.sex,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          token,
        },
      });
    }
    next({
      status: HttpCode.UNATHORIZED,
      message: "Invalid credentials",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user.id;
  await authService.logout(userId);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

module.exports = {
  registration,
  login,
  logout,
};
