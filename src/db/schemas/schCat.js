const { number } = require("joi");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for cat"],
      unique: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 25,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    owner: {
      name: String,
      age: Number,
      addres: String,
    },
  },
  {
    versionKey: false,
    timestamps: true, //createdAt and updatedAt
  }
);

catSchema.virtual("nameAge").get(function () {
  return this.name + " " + this.age;
});

const Cat = model("cat", catSchema);
module.exports = Cat;
