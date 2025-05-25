// Load QR code generator library
const QRCode = require('qrcode');

// Content for the QR code - your final Railway live URL
const qrContent = "https://talented-quietude-production.up.railway.app/index.html";

// Generate QR code image
QRCode.toFile('QR123.png', qrContent, {
  color: { dark: '#000', light: '#FFF' }
}, function (err) {
  if (err) throw err;
  console.log('QR code saved as QR123.png');
});

// The rest of your server
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" }); // Save images to /uploads

// Serve static files (like index.html and QR123.png) from the root directory
app.use(express.static(path.join(__dirname)));

// CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Handle image upload from HTML page
app.post("/upload", upload.single("photo"), (req, res) => {
  const qrCodeData = req.body.qrData;
  const photoPath = req.file.path;

  console.log("QR Code:", qrCodeData);
  console.log("Photo saved at:", photoPath);

  // Save to database or cloud storage as needed
  res.json({ message: "Upload successful!", qrCodeData, photoPath });
});

// Start the server on the port provided by Railway (or default to 3000 locally)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));



