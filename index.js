require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const db = process.env.MONGO_URI;
const adminRoutes = require('./routes/adminRoute');

const app = express();


app.use(express.json());
app.use(cors({ origin: '*' }));

// Add Cache-Control middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

mongoose.connect(db)
    .then(() => {
        console.log('MongoDB connected...');
        
        // Start the server only after successful connection
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
    });


app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));


app.get("/test", (req, res) => {
    res.send("Express app is running");
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/admin', adminRoutes);


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
