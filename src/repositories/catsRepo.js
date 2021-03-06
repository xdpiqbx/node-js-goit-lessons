//https://youtu.be/ydNH8HvjeKI?t=6428

const e = require("cors");
const { ObjectID } = require("mongodb");

const { HttpCode } = require("../helpers/constants");
const { ErrroHandler } = require("../helpers/errorHandler");

const Cat = require("../db/schemas/schCat");

class CatsRepo {
  constructor() {
    this.model = Cat;
  }

  async getAll(userId) {
    const results = await this.model.find({ owner: userId }).populate({
      path: "owner",
      select: "name email sex -_id",
    });
    return results;
  }

  async getById(id, userId) {
    try {
      const result = await this.model
        .findOne({ _id: id, owner: userId })
        .populate({
          path: "owner",
          select: "name email sex -_id",
        });
      return result;
    } catch (error) {
      error.status = 400;
      error.data = "Bad request";
      throw error;
    }
  }

  async create(body, userId) {
    const result = this.model.create({ ...body, owner: userId });
    return result;
  }

  async update(id, body, userId) {
    const result = await this.model.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true } // чтоб не возвращал предидущую запись
    );
    return result;
  }

  async updateStatus(id, body, userId) {
    return this.update(id, body, userId);
  }

  async remove(id, userId) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = CatsRepo;
