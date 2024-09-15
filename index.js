require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path');
const adminRoutes = require('./routes/adminRoute');

const app = express();
const db = process.env.MONGO_URI;


app.use(express.json());
app.use(cors());

mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
    });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

app.get("/test", (req, res) => {
    res.send("Express app is running");
});

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


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
