const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
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
      // type: mongoose.Types.ObjectId,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      // "user" - должно совпадать с "user" в const User = model("user", userSchema);
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

catSchema.plugin(mongoosePaginate);

const Cat = model("cat", catSchema);
module.exports = Cat;
