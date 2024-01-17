const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import cors
const app = express();
const port = 3001;

// Use cors middleware
app.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Serve the uploads folder
app.use('/uploads', express.static('uploads'));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
