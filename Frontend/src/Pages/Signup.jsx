import React from 'react'
import './CSS/Signup.css'
import { useState } from 'react'

export default function Signup() {

  const [data, setData]=useState({
    name:'',
    email:'',
    password:'',
  })
  const signupUser=(e)=>{
    e.preventDefalut()
    //axios.get('/')
  }

  return (
    <div className='loginsignup'>
      <form className='loginsignup-container' onSubmit={signupUser}> 
      <h1>Sign Up</h1>
      <div className='loginsignup-fields'>
        <input type="text" placeholder='Your Name' value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} />
        <input type="email" placeholder='Email Address' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}  />
        <input type="password" placeholder='Password' value={data.password} onChange={(e)=>setData({...data, password: e.target.value})}  />
      </div>
      <button>Continue</button>
    </form>
  </div>
  )
}
