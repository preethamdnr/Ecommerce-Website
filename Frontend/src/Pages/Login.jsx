import React from 'react'
import './CSS/Login.css'
import {useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import './Signup.jsx'

export default function Login(){

  const [data, setData]=useState({
    email:'',
    password:'',
  })
  const loginUser=(e)=>{
    axios.get('/')
  }
  
  return (
    <div className='loginsignup'>
      <form className='loginsignup-container' onSubmit={loginUser}> 
      <h1>Login</h1>
      <div className='loginsignup-fields'>
        <input type="email" placeholder='Email Address' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}  />
        <input type="password" placeholder='Password' value={data.password} onChange={(e)=>setData({...data, password: e.target.value})} />
      </div>
      <button>Login</button>
      <p className='loginsignup-login'>Not have an account ?<Link to='/Signup'>Signup</Link></p>
      <div className='loginsignup-agree'>
        <input type="checkbox" name='' id='' />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
    </form>
  </div>
  )
}
