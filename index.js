require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const path = require('path'); 
const db = process.env.MONGO_URI;
const adminRoutes = require('./routes/adminRoute');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
    });
//telling backend to look for frontend here in this folder
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))
app.get("/test",(req,res)=>{
    res.send("Express app is running")
})

app.use('/api/admin', adminRoutes);

//serving frontend routes first
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
});

app.listen(5000, () => {
    //connect();
    console.log('Server is running on port 5000');
});
