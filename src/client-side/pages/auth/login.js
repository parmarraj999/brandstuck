import React from 'react'
import './auth.css';

function Login({setLogin}) {
  return (
    <div className='login-container' >
        <h2>log in</h2>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <div style={{display:'flex',gap:".5rem"}}>
            <input type='checkbox' style={{width:"20px"}}/>
            <p>keep my login</p>
        </div>
        <button className='login-btn' >Login</button>
        <div style={{display:'flex',gap:".5rem",alignItems:"center",justifyContent:"center"}}>
            <div className='line' />
            <p>or</p>
            <div className='line' />
        </div>
        <button className='sign-btn' onClick={()=>setLogin(false)}>Create New Account</button>
    </div>
  )
}

export default Login