const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true, dropDups: true },
  firstName: { type: String, required: true, unique: false, maxlength: 20 },
  lastName: { type: String, required: true, unique: false, maxlength: 20 },
  age: { type: Number, required: true, unique: false, min: 0, max: 120 },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
    unique: false,
  },
  maritalStatus: {
    type: String,
    enum: ["single", "married", "widower", "divorced"],
    required: true,
    unique: false,
  },
  kids: [
    {
      type: String,
      required: false,
      unique: false,
      maxlength: 50,
    },
  ],
}, { versionKey: false });

const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;
