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

app.post('/add-to-cart', async (req, res) => {
  const { email, productId, quantity } = req.body;

  try {
    const user = await userdetailsModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product already exists in the cart
    const existingItem = user.cart.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      // If it exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If not, add the new item
      user.cart.items.push({ productId, quantity });
    }

    // Calculate total price for the cart
    user.cart.totalPrice = user.cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cart: user.cart });

  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'An error occurred while adding to cart', error: err.message });
  }
});

app.post('/place-order', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userdetailsModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new order object
    const newOrder = {
      orderId: new mongoose.Types.ObjectId(),
      items: user.cart.items,
      totalAmount: user.cart.totalPrice,
      status: 'Pending'
    };

    // Push the new order to the order history
    user.orderHistory.push(newOrder);

    // Clear the cart
    user.cart.items = [];
    user.cart.totalPrice = 0;

    await user.save();
    res.status(200).json({ message: 'Order placed successfully', order: newOrder });

  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'An error occurred while placing the order', error: err.message });
  }
});


app.listen(3001, () => {
  console.log('Server is running Preetham(on port 3001)');
});
