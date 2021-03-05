const { UsersRepo } = require("../repositories");
const db = require("../db");

class UsersService {
  constructor() {
    this.repo = {
      users: new UsersRepo(),
    };
  }

  async create(body) {
    const data = await this.repo.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repo.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repo.users.findById(id);
    return data;
  }
}

module.exports = UsersService;
