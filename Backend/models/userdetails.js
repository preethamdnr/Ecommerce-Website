const mongoose = require('mongoose');

// Updated user schema
const userdetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [30, 'Name cannot exceed 30 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Name should contain only letters and spaces'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  cart: {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
      }
    ],
    totalPrice: { type: Number, default: 0 }
  },
  orderHistory: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      orderDate: { type: Date, default: Date.now },
      items: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true }
        }
      ],
      totalAmount: { type: Number, required: true },
      status: { type: String, enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'], default: 'Pending' }
    }
  ]
});

const userdetailsModel = mongoose.model('User', userdetailsSchema);
module.exports = userdetailsModel;
