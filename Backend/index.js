const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userdetailsModel = require('./models/userdetails');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

mongoose.connect('mongodb://127.0.0.1:27017/userdetails')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};


app.post('/Signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
  
    const existingUser = await userdetailsModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

  
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password does not meet criteria. Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userdetailsModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'An error occurred during signup', error: err.message });
  }
});


app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userdetailsModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'The password is incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'An error occurred while processing the request', error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running Preetham(on port 3001)');
});
