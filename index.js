const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Bot Hosting Service!");
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully!");
});

module.exports = app;
