import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
// import "../../styles/theme/theme.css";
import './main.css'
import Marquee from './marquee/marquee'
import Carousel from './carousel/carousel'
import Text from './text-section/text'
import MiddleImage from './middle-image-section/middleImage'
import NewProduct from './new-product/newProduct'
import TrendingProduct from './trending-product/trendingProduct'
import Outfit from './outfit-section/outfit'
import BrandList from './brand-list/brandList'
import Customize from './customize-section/customize'
import Category from './category/category'
import Store from './store-section/store'

function Home() {

  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className='home-container' >
      <Marquee/>
      <Carousel/>
      <Text/>
      <NewProduct/>
      <MiddleImage/>
      <TrendingProduct/>
      <Outfit/>
      <BrandList/>
      <Customize/>
      <Category/>
      <Store/>
    </div>
  )
}

export default Home