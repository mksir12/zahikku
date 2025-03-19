const express = require("express");

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Example API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
