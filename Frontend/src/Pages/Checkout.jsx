import React from 'react';
import './CSS/Checkout.css';

const Checkout = () => {
  return (
    <div className='main-container'>
      <form className='form-container' onSubmit={(e) => e.preventDefault()}>
        <h1>Shipping Details</h1>

        <div className="two-column">
          <div className="form-row">
            <label>First Name:</label>
            <input type="text" placeholder='First Name' required />
          </div>
          <div className="form-row">
            <label>Last Name:</label>
            <input type="text" placeholder='Last Name' required />
          </div>
        </div>

        <div className="form-row">
          <label>Address:</label>
          <input type="text" placeholder='Address' required />
        </div>

        <div className="form-row">
          <label>Email:</label>
          <input type="email" placeholder='Email' required />
        </div>

        <div className="two-column">
          <div className="form-row">
            <label>Phone Number:</label>
            <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}" inputMode="numeric" required />
          </div>
          <div className="form-row">
            <label>Pincode:</label>
            <input type="number" placeholder="Pincode" pattern="\d{6}" inputMode="numeric" required />
          </div>
        </div>

        <button type="submit" className="button-primary">Confirm Details</button>
      </form>

      <form className='form-container' onSubmit={(e) => e.preventDefault()}>
        <h1>Card Details</h1>

        <div className="form-row">
          <label>Cardholder Name:</label>
          <input type="text" placeholder='Cardholder Name' required />
        </div>

        <div className="form-row">
          <label>Card Number:</label>
          <input type="text" placeholder='Card Number' maxLength="16" pattern="\d{16}" inputMode="numeric" required />
        </div>

        <div className="two-column">
        <div className="form-row">
            <label>Expiry Date:</label>
            <input type="text" placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/\d{2}$" required />
        </div>
          <div className="form-row">
            <label>CVV:</label>
            <input type="password" placeholder='CVV' maxLength="3" pattern="\d{3}" required />
          </div>
        </div>

        <button type="submit" className="button-primary">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
