const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "provide your firstname"],
  },
  lastname: {
    type: String,
    required: [true, "provide your lastname"],
  },
    email: {
        type: String,
        required: [true, "provide your email"]
    },
    password: {
        type: String,
        required: [true, "provide your password"]
  },
  createdAt: {
    type: Date,
    default: Date.now
    }
});

module.exports = model('User', userSchema);
