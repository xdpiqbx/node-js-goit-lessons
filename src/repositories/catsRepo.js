// const { v4: uuid } = require("uuid");
const e = require("cors");
const { ObjectID } = require("mongodb");

const { HttpCode } = require("../helpers/constants");
const { ErrroHandler } = require("../helpers/errorHandler");

const Cat = require("../db/schemas/schCat");

// const db = require("../db");

class CatsRepo {
  // constructor(client) {
  //   this.collection = client.db().collection("cats");
  // }
  constructor() {}

  // mongoose сам преобразовывает id
  // #getMongoId(id) {
  //   try {
  //     return ObjectID(id);
  //   } catch (error) {
  //     throw new ErrroHandler(
  //       HttpCode.BAD_REQUEST,
  //       `MongoDb _id: ${error.message}`,
  //       "Bad request"
  //     );
  //   }
  // }

  async getAll() {
    // const results = await this.collection.find({}).toArray();
    const results = await Cat.find({}); // mongoose сам распарсит в Array
    return results;
  }

  async getById(id) {
    try {
      // const objId = this.#getMongoId(id);
      // const [result] = await this.collection.find({ _id: objId }).toArray();
      const result = await Cat.findOne({ _id: id });
      console.log(result.id);
      console.log(result._id);
      console.log(result.nameAge);
      return result;
    } catch (error) {
      error.status = 400;
      error.data = "Bad request";
      throw error;
    }
  }

  // async create(body) {
  //   const record = {
  //     ...body,
  //     ...(body.isVaccinated ? {} : { isVaccinated: false }),
  //   };
  //   const {
  //     ops: [result],
  //   } = await this.collection.insertOne(record);
  //   //Вернёт навороченый объект в котором есть свойство ops (тут всё что я вставил)
  //   return result;
  // }
  async create(body) {
    const result = Cat.create(body);
    return result;
  }

  // async update(id, body) {
  //   const objId = this.#getMongoId(id);
  //   const { value: result } = await this.collection.findOneAndUpdate(
  //     { _id: objId },
  //     { $set: body },
  //     { returnOriginal: false } // чтоб не возвращал предидущую запись
  //   );
  //   return result;
  // }
  async update(id, body) {
    const result = await Cat.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true } // чтоб не возвращал предидущую запись
    );
    return result;
  }

  async updateStatus(id, body) {
    return this.update(id, body);
  }

  // async remove(id) {
  //   const objId = this.#getMongoId(id);
  //   const { value: result } = await this.collection.findOneAndDelete({
  //     _id: objId,
  //   });
  //   return result;
  // }
  async remove(id) {
    const result = await Cat.findByIdAndRemove({
      _id: id,
    });
    return result;
  }
}

module.exports = CatsRepo;

// getAll() {
//   return db.get("cats").value();
// }

// getById(id) {
//   return db.get("cats").find({ id }).value();
// }

// create(body) {
//   const id = uuid();
//   const record = {
//     id,
//     ...body,
//     ...(body.isVaccinated ? {} : { isVaccinated: false }),
//   };
//   db.get("cats").push(record).write();
//   return record;
// }

// update(id, body) {
//   const record = db
//     .get("cats")
//     .find({ id })
//     .assign({ ...body })
//     .value();
//   db.write();
//   return record;
// }

// updateStatus({ id }, body) {
//   const record = db
//     .get("cats")
//     .find({ id })
//     .assign({ ...body })
//     .value();
//   db.write();
//   return record;
// }

// remove(id) {
//   const [record] = db.get("cats").remove({ id }).write();
//   return record;
// }
