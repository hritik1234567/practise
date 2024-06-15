const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('pdf'), (req, res) => {
  const uploadedFilename = req.file.filename;
  const filePath = `./uploads/${uploadedFilename}`;
  res.send(filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
