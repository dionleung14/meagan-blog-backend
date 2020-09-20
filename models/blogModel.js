const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  category: {
    type: String,
  },
  userCreated: {
    type: String,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
