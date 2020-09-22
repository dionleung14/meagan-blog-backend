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

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

// Default home page of server
app.get("/", (req, res) => {
  res.send(
    `This backend will have all blog posts. My favorite pokemon is ${process.env.POKEMON}`
  );
});

// Retrieve all blogs from database
app.get("/all", (req, res) => {
  db.Blog.find({}, (err, found) => {
    if (err) {
      res.status(500).send("error?");
    } else {
      res.status(200).json(found);
    }
  });
});

// Retrieve one blog from database given the id of the blog
app.get("/blog/:id", (req, res) => {
  db.Blog.findOne({ _id: req.params.id }, (err, found) => {
    if (err) {
      res.status(500).send("error?");
    } else {
      res.status(200).json(found);
    }
  });
});

// Deletes a blog from database given the id of the blog
app.delete("/blog/:id", (req, res) => {
  db.Blog.deleteOne({ _id: req.params.id }, (err, found) => {
    if (err) {
      res.status(500).send("error?");
    } else {
      res.status(200).json(found);
    }
  });
});

// Creates a new blog in the database
app.post("/blog", (req, res) => {
  // res.send(req.body);
  db.Blog.create(req.body)
    .then((dbBlog) => {
      console.log(dbBlog);
      res.json(dbBlog);
    })
    .catch((err) => {
      res.send(err);
    });
  // res.status(200).send("you wanted to post to me?");
});

// Gets the most recent photo from cloudinary
// app.get("/recentphoto", (req, res) => {
//   const getImage = await Image.findOne().sort({ _id})
// })
