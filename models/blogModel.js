const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  bodyOne: {
    type: String,
  },
  bodyTwo: {
    type: String,
  },
  bodyThree: {
    type: String,
  },
  bodyFour: {
    type: String,
  },
  imageOne: {
    type: String,
  },
  // imageTwo: {
  //   type: String,
  // },
  // imageThree: {
  //   type: String,
  // },
  // imageFour: {
  //   type: String,
  // },
  category: {
    type: String,
  },
  userCreated: {
    type: String,
    default: Date.now().toString(),
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
