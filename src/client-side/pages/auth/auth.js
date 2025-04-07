import React, { useState } from 'react'
import './auth.css';
import Footer from '../footer/footer';
import SmallNav from '../nav/smallNav';
import Login from './login';
import Signup from './signup';

function Auth() {

  const [login, setLogin] = useState(true)

  return (
    <div className='auth-container' >
      <SmallNav />
      <div className='auth-wrapper' >
        <h1>account</h1>
        <div className='auth-form-container' >
          {
            login ? <Login setLogin={setLogin}/> : <Signup setLogin={setLogin}/>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Auth