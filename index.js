const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Serve static files (uploaded files)
app.use("/uploads", express.static(uploadDir));

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const uploadedFilePath = `/uploads/${req.file.filename}`;
    const botToken = req.body.bot_token;

    let telegramWebhookUrl = "";
    if (botToken) {
        telegramWebhookUrl = `https://api.telegram.org/bot${encodeURIComponent(botToken)}/setWebhook?url=${process.env.BASE_URL}${uploadedFilePath}`;
    }

    res.json({
        success: true,
        file: uploadedFilePath,
        fileType: req.file.mimetype,
        telegramWebhookUrl,
    });
});

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Node.js Bot Hosting Service!");
});

// Start server (Only for local testing)
if (process.env.NODE_ENV !== "vercel") {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; // For Vercel deployment
