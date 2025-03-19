import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
// import "../../styles/theme/theme.css";
import './main.css'
import Marquee from './marquee/marquee'
import Carousel from './carousel/carousel'
import Text from './text-section/text'

function Home() {

  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className='home-container' >
      <Marquee/>
      <Carousel/>
      <Text/>
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}

    </div>
  )
}

export default Home