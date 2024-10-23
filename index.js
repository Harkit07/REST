const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    name: "adam",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    name: "eve",
    content: "i love dogs",
  },
  {
    id: uuidv4(),
    name: "lucifer",
    content: "i do hardwork",
  },
];

app.listen(port, () => {
  console.log(`listening on the port ${port}`);
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", {post});
});

app.post("/posts", (req, res) => {
  let {name, content} = req.body;
  let id = uuidv4();
  posts.push({id, name, content});
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.send("working");
  console.log(post);
});

app.get("/posts/:id/edit", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", {post});
  // let newContent = req.body.content;
  // post.content = newContent;
  res.redirect("patch request working");
});

app.patch("/posts/:id/edit", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let {id} = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});