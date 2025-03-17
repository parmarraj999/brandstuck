import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
// import "../../styles/theme/theme.css";
import './home.css'

function Home() {

  const { theme , toggleTheme } = useContext(ThemeContext)

  return (
    <div className='home-container' >
      <h1>Home {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default Home