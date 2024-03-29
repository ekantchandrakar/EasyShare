const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());

// Database connection
const connectDB = require('./config/db');
connectDB();

// CORS 
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5500','http://localhost:3001','http://127.0.0.1:3000','https://ekantchandrakar.github.io/fileShare/','https://ekantchandrakar.github.io']
}

app.use(cors(corsOptions));

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 😍`);
});