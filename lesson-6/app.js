const express = require("express");

// express app
const app = express();

// listen for requests and return a server
app.listen(3000, () => console.log("Server started on 3000"));

app.get("/", (req, res) => {
  // send() set the content-type in header and status code
  // res.send('<p>home page</p>');
  // res.sendFile(__dirname + "/views/index.html"); // works but not recommended
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects
app.get("/about-us", (req, res) => {
  // automatically sets status code
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
