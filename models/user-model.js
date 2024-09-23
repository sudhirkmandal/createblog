const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },   
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: "./profile.webp",
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",  
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
