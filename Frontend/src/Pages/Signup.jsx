import React from 'react';
import './CSS/Signup.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const signupUser = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Name is required.');
      return;
    }

    if (!email) {
      alert('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!password) {
      alert('Password is required.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

    axios.post('http://localhost:3001/Signup', { name, email, password })
      .then(result => {
        console.log(result);
        alert(result.data.message);
        navigate('/Login');
      })
      .catch(err => {
        console.log(err);
        alert('An error occurred during signup. Please try again.');
      });
  };

  return (
    <div className='loginsignup'>
      <form className='loginsignup-container' onSubmit={signupUser}>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
