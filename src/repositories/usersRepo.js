const User = require("../db/schemas/schUser");

//https://youtu.be/DGS9nbwDarQ?t=2254

class UsersRepo {
  constructor() {
    this.model = User;
  }

  // async getAll() {
  //   const results = await this.model.find({}); // mongoose сам распарсит в Array
  //   return results;
  // }

  async getById(id) {
    try {
      const result = await this.model.findOne({ _id: id });
      // console.log(result.id);
      // console.log(result._id);
      // console.log(result.nameAge);
      return result;
    } catch (error) {
      error.status = 400;
      error.data = "Bad request";
      throw error;
    }
  }

  async create(body) {
    const result = this.model.create(body);
    return result;
  }

  // async update(id, body) {
  //   const result = await this.model.findByIdAndUpdate(
  //     { _id: id },
  //     { ...body },
  //     { new: true } // чтоб не возвращал предидущую запись
  //   );
  //   return result;
  // }

  // async updateStatus(id, body) {
  //   return this.update(id, body);
  // }

  // async remove(id) {
  //   const result = await this.model.findByIdAndRemove({
  //     _id: id,
  //   });
  //   return result;
  // }
}

module.exports = CatsRepo;
