import React from 'react'
import './auth.css';

function Signup({setLogin}) {
    return (
        <div className='login-container' >
            <h2>sign up</h2>
            <input type='text' placeholder='Name' />
            <input type='text' placeholder='Email' />
            <input type='password' placeholder='Password' />
            <input type='password' placeholder='Confirm Password' />
            {/* <div style={{ display: 'flex', gap: ".5rem" }}>
                <input type='checkbox' style={{ width: "20px" }} />
                <p>keep me login</p>
            </div> */}
            <button className='sign-btn'>Create New Account</button>
            <div style={{ display: 'flex', gap: ".5rem", alignItems: "center", justifyContent: "center" }}>
                <div className='line' />
                <p>or</p>
                <div className='line' />
            </div>
            <button className='login-btn' onClick={()=>setLogin(true)}>Login</button>
        </div>
    )
}

export default Signup