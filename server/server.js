const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the MONGO_URI from the .env file
const uri = process.env.MONGO_URI;

// Check if the connection string is loaded correctly
if (!uri) {
    console.error('MONGO_URI is not defined in the .env file');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append date to filename
    }
});

const upload = multer({ storage });

// Route to upload an image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Here you can save the file info to your database if needed
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.send({ imageUrl });
});

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Set the port from the .env file
const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
