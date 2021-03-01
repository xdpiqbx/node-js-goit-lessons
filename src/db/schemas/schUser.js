const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
SALT_FACTOR = 6;
const { Schema, model } = mongoose;

const { Sex } = require("../../helpers/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      default: "Guest",
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "This gender isn't allowed",
      },
      default: Sex.NONE,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true, //createdAt and updatedAt
  }
);

// hook .pre
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
module.exports = User;
