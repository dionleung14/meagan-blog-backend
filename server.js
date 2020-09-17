// Sets up the express app
const express = require("express");

const cors = require("cors");

// const mongojs = require("mongojs");
const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");
require("dotenv").config();
// Uses this as the new database collection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/meagan-blog", {
  useNewUrlParser: true,
});

const app = express();
const PORT = process.env.PORT || 8080;
// const allRoutes = require("./controllers");

// Requiring our models for syncing
const db = require("./models");
// const Blog = require("./models/blogModel");

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// developing
app.use(
  cors({
    options: ["http://localhost:3000/"],
  })
);

// deployed site
// app.use(
//   cors({
//     options: ["https://dion-leung-portfolio.herokuapp.com/"],
//   })
// );

// Static directory
app.use(express.static("public"));

// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// app.use("/", allRoutes);

// const tempBlogs = [
//   {
//     title: "Gone with the Wind",
//     body: "Let's go to the mall",
//   },
//   {
//     title: "Running with Scissors",
//     body: "Do you like Weird Al?",
//   },
// ];

app.get("/", (req, res) => {
  res.send(
    `This backend will have all blog posts. My favorite pokemon is ${process.env.POKEMON}`
  );
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

app.get("/all", (req, res) => {
  db.Blog.find({}, (err, found) => {
    try {
      res.status(200).json(found);
    } catch (err) {
      res.status(500).send("error?");
    }
  });
});

app.post("/blog", (req, res) => {
  // res.send(req.body);
  db.Blog.create(req.body)
    .then((dbBlog) => {
      res.json(dbBlog);
    })
    .catch((err) => {
      res.send(err);
    });
  // res.status(200).send("you wanted to post to me?");
});
