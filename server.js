


// Load QR code generator library
const QRCode = require('qrcode');

// Content for the QR code - your deployed app URL
const qrContent = "https://myapp.onrender.com/index.html"; // Replace with your real URL!

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

const app = express();
const upload = multer({ dest: "uploads/" }); // Save images to /uploads

// Serve static files (like index.html and QR123.png)
app.use(express.static(__dirname));
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

// Start the server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
