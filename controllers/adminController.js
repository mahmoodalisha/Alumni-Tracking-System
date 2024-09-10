const Admin = require('../models/adminModel');
const Alumni = require('../models/alumniModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadsDir = path.join(__dirname, '..', 'uploads');


if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}


const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);


exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token after 'Bearer'
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.adminId = decoded.id;
        next();
    });
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir), 
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

// Admin login handler
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = createToken(admin._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createAlumni = [
    upload.single('photo'),
    async (req, res) => {
        const { name, email, graduationYear, company, linkedinProfile, motivationMessage } = req.body;
        try {
            const alumni = new Alumni({
                name,
                email,
                graduationYear,
                company,
                linkedinProfile,
                photo: req.file ? req.file.filename : '', 
                motivationMessage
            });
            await alumni.save();
            res.status(201).json({ message: 'Alumni created successfully', alumni });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
];


exports.getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateAlumni = async (req, res) => {
    const { id } = req.params;
    const { name, email, graduationYear, company, linkedinProfile, motivationMessage } = req.body;

    try {
        console.log('Updating alumni with data:', { name, email, graduationYear, company, linkedinProfile, motivationMessage });

        const alumni = await Alumni.findByIdAndUpdate(
            id,
            { name, email, graduationYear, company, linkedinProfile, motivationMessage },
            { new: true }
        );
        
        if (!alumni) return res.status(404).json({ message: 'Alumni not found' });
        res.status(200).json({ message: 'Alumni updated successfully', alumni });
    } catch (error) {
        console.error('Error updating alumni:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.deleteAlumni = async (req, res) => {
    const { id } = req.params;
    try {
        const alumni = await Alumni.findByIdAndDelete(id);
        if (!alumni) return res.status(404).json({ message: 'Alumni not found' });
        res.status(200).json({ message: 'Alumni deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
