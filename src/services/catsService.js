const { CatsRepo } = require("../repositories");
const db = require("../db");
class CatsService {
  constructor() {
    process.nextTick(async () => {
      const client = await db;
      this.repo = {
        cats: new CatsRepo(client),
      };
    });
  }

  getAll(userId) {
    return this.repo.cats.getAll(userId);
  }

  getById({ id }, userId) {
    return this.repo.cats.getById(id, userId);
  }

  create(body) {
    return this.repo.cats.create(body);
  }

  update({ id }, body, userId) {
    return this.repo.cats.update(id, body, userId);
  }

  updateStatus({ id }, body, userId) {
    return this.repo.cats.updateStatus(id, body, userId);
  }

  remove({ id }, userId) {
    return this.repo.cats.remove(id, userId);
  }
}

module.exports = CatsService;
