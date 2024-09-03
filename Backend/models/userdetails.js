const mongoose = require('mongoose');
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
});

const userdetailsModel = mongoose.model('register', userdetailsSchema);
module.exports = userdetailsModel;
