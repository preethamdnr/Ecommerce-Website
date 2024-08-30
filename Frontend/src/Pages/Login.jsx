import React from 'react'
import './CSS/Login.css'
import {useState} from 'react'
import axios from 'axios'
import { Link,useNavigate } from "react-router-dom";
import './Signup.jsx'

export default function Login(){

  const [email, setEmail]=useState()
  const [password, setPassword]=useState()
  const navigate = useNavigate();
  const loginUser=(e)=>{
    e.preventDefault()
    // condition will have to chek both email and pass string > 
    axios.post('http://localhost:3001/Login',{email, password})
    .then(result =>{console.log(result)
      if(result.data==="Success"){
        navigate('/')
      }
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <div className='loginsignup'>
      <form className='loginsignup-container' onSubmit={loginUser}> 
      <h1>Login</h1>
      <div className='loginsignup-fields'>
        <input type="email" placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}  />
        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
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
