const { UsersRepo } = require("../repositories");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  // constructor() {
  //   process.nextTick(async () => {
  //     const client = await db;
  //     this.repo = {
  //       users: new UsersRepo(client),
  //     };
  //   });
  // }
  constructor() {
    this.repo = {
      users: new UsersRepo(),
    };
  }

  async login({ email, password }) {
    const user = await this.repo.users.findByEmail(email);
    if (!user || !user.validPassword(password)) {
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
