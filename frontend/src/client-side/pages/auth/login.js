import React, { useContext, useEffect, useState } from 'react'
import './auth.css';
import { handleLogInWithEmail } from '../../functions/signInWithGoogle';
import { useNavigate } from 'react-router-dom';
import { UserCredentialContext } from '../../context/userCredentialProvider';

function Login({ setLogin, setError, setLoading }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [status, setStatus] = useState('notSignUp')

  const handleLogin = () => {
    handleLogInWithEmail(setError, setLoading, email, password, setStatus)
  }

  const navigate = useNavigate();

  const { fetchCredentials } = useContext(UserCredentialContext)

  useEffect(() => {
    if (status === 'signUp') {
      window.localStorage.setItem("isLogIn", true)
      navigate('/profile')
      fetchCredentials();
    }
  }, [status])

  return (
    <div className='login-container' >
      <h2>log in</h2>
      <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <div style={{ display: 'flex', gap: ".5rem" }}>
        <input type='checkbox' style={{ width: "20px" }} />
        <p>keep my login</p>
      </div>
      <button className='login-btn' onClick={handleLogin} >Login</button>
      <div style={{ display: 'flex', gap: ".5rem", alignItems: "center", justifyContent: "center" }}>
        <div className='line' />
        <p>or</p>
        <div className='line' />
      </div>
      <button className='sign-btn' onClick={() => setLogin(false)}>Create New Account</button>
    </div>
  )
}

export default Login