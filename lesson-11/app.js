const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://fady:fady1@cluster0.izqadsw.mongodb.net/Node_tutorial?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  // listen for requests and return a server
  .then((result) =>
    app.listen(3000, () => console.log("Server started on 3000"))
  )
  .catch((err) => console.error("MongoDB connection error:", err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// see what locals used for?
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
