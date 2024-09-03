const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userdetailsModel = require('./models/userdetails');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = crypto.randomBytes(64).toString('hex'); 


mongoose.connect('mongodb://127.0.0.1:27017/userdetails')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


app.post('/Signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await userdetailsModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userdetailsModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during signup', error: err });
  }
});


app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await userdetailsModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No record exists' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'The password is incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }
});

app.listen(3001,()=>{
    console.log('Server is running preetham')
})