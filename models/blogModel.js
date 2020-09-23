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
  imageOneURL: {
    type: String,
  },
  imageTwoURL: {
    type: String,
  },
  imageThreeURL: {
    type: String,
  },
  imageFourURL: {
    type: String,
  },
  category: {
    type: String,
  },
  userCreated: {
    type: Number,
    default: Date.now().toString(),
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
