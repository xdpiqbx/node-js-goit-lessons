const User = require("../db/schemas/schUser");

class UsersRepo {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    try {
      const result = await this.model.findOne({ _id: id });
      return result;
    } catch (error) {
      error.status = 400;
      error.data = "Bad request";
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const result = await this.model.findOne({ email });
      return result;
    } catch (error) {
      error.status = 400;
      error.data = "Bad request";
      throw error;
    }
  }

  async create(body) {
    const user = this.model(body);
    return user.save();
    //В схеме стоит хук на save - userSchema.pre("save", async function (next)...
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }
}

module.exports = UsersRepo;
