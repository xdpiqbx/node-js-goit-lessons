const { UsersRepo } = require("../repositories");

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

  async updateAvatar(id, avatarUrl, imgIdCloud) {
    await this.repo.users.updateAvatar(id, avatarUrl, imgIdCloud);
  }
}

module.exports = UsersService;
