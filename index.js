const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (if needed)
app.use(express.static("public"));

// Multer storage setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Default homepage
app.get("/", (req, res) => {
  res.send(`
    <h1>Node.js Bot Hosting Service</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
    </form>
    <form action="/set-webhook" method="post">
      <input type="text" name="webhook" placeholder="Enter webhook URL" required />
      <button type="submit">Set Webhook</button>
    </form>
  `);
});

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.send("No file uploaded.");
  res.send(`File uploaded: ${req.file.filename}`);
});

// Webhook setup route
app.post("/set-webhook", express.urlencoded({ extended: true }), (req, res) => {
  const webhookURL = req.body.webhook;
  if (!webhookURL) return res.send("No webhook URL provided.");
  res.send(`Webhook set to: ${webhookURL}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
