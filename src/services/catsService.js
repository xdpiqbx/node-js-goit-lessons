const { CatsRepo } = require("../repositories");
class CatsService {
  constructor() {
    this.repo = {
      cats: new CatsRepo(),
    };
  }

  getAll(userId, query) {
    return this.repo.cats.getAll(userId, query);
  }

  getById({ id }, userId) {
    return this.repo.cats.getById(id, userId);
  }

  create(body, userId) {
    return this.repo.cats.create(body, userId);
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
