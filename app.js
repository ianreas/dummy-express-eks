const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express.js on EKS!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.get("/meow", (req, res) => {
  console.log("meow stdout");
  console.error("meow stderr");
  res.json({ message: "Meow from Express.js on EKS!" });
});

app.get("/bark", (req, res) => {
  console.log("bark stdout");
  console.error("bark stderr");
  res.json({ message: "Bark from Express.js on EKS!" });
});
