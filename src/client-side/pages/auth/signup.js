import React, { useEffect, useState } from 'react'
import './auth.css';
import { handleEmailPasswordAuth } from '../../functions/signInWithGoogle';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Signup({ setLogin, setError, setLoading }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    // const [userId, setUserId] = useState(uuidv4());
    const [status, setStatus] = useState('notSignUp')

    const handleSignUp = () => {
        handleEmailPasswordAuth(setError, setLoading, name, email, password, number,setStatus)
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'signUp') {
            window.localStorage.setItem("isLogIn", true)
            navigate('/profile')
        }
    }, [status])

    return (
        <div className='login-container' >
            <h2>sign up</h2>
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <input type='type' placeholder='Phone' onChange={(e) => setNumber(e.target.value)} />

            <button className='sign-btn' onClick={handleSignUp}>Create New Account</button>

            <div style={{ display: 'flex', gap: ".5rem", alignItems: "center", justifyContent: "center" }}>
                <div className='line' />
                <p>or</p>
                <div className='line' />
            </div>
            <button className='login-btn' onClick={() => setLogin(true)}>Login</button>
        </div>
    )
}

export default Signup