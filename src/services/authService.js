const { UsersRepo } = require("../repositories");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor() {
    this.repo = {
      users: new UsersRepo(),
    };
  }

  async login({ email, password }) {
    const user = await this.repo.users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword) {
      //userSchema.methods.validPassword = ....
      return null;
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await this.repo.users.updateToken(id, token);
    return token;
  }

  async logout(id) {
    await this.repo.users.updateToken(id, null);
  }
}

module.exports = AuthService;
