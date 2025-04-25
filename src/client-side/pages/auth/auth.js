import React, { useEffect, useState } from 'react'
import './auth.css';
import Footer from '../footer/footer';
import SmallNav from '../nav/smallNav';
import Login from './login';
import Signup from './signup';
import { useNavigate } from 'react-router-dom';

function Auth() {

  const [login, setLogin] = useState(true)
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const isLogin = window.localStorage.getItem("isLogIn")

  useEffect(()=>{
    if(isLogin){
      navigate('/profile')
    }
  },[])

  return (
    <div className='auth-container' >

      <SmallNav />
      <div className='auth-wrapper' >
        <h1>account</h1>
        <div className='auth-form-container' >
          {
            login ?
              <Login
                setError={setError}
                setLogin={setLogin}
                setLoading={setLoading}
              />
              :
              <Signup
                setError={setError}
                setLoading={setLoading}
                setLogin={setLogin} />
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Auth