require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path');
const adminRoutes = require('./routes/adminRoute');

const app = express();
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
    });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration: Allow only specific origins (your frontend URL)
const allowedOrigins = [
    'https://alumni-tracking-system-psi.vercel.app/', // Replace with your actual frontend URL
    'http://localhost:3000' // Add localhost for development purposes
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (such as mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // Allows cookies and authorization headers to be sent
}));

// Body parser
app.use(express.json());

// Serve static frontend files (React app)
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

// Test route
app.get("/test", (req, res) => {
    res.send("Express app is running");
});

// API routes
app.use('/api/admin', adminRoutes);

// Catch-all route to serve frontend (React)
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
