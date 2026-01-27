import React, { useEffect } from 'react'
// import "../../styles/theme/theme.css";
import './main.css'
import Marquee from './marquee/marquee'
import Carousel from './carousel/carousel'
import Text from './text-section/text'
import MiddleImage from './middle-image-section/middleImage'
import NewProduct from './new-product/newProduct'
import TrendingProduct from './trending-product/trendingProduct'
import Outfit from './outfit-section/outfit'
import Customize from './customize-section/customize'
import Category from './category/category'
import Store from './store-section/store'
import Why from './why-section/why'
import Map from './map/map'
import Footer from '../footer/footer'
import { fetchNewDropProducts } from '../../functions/newDropProduct'
import Loader from '../../component/loader/Loader'
import { useState } from 'react'

function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); // Wait for animation to mostly complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='home-container' >
      {loading && <Loader />}
      {/* <Marquee/> */}
      <Carousel />
      <Text />
      <NewProduct />
      <MiddleImage />
      <TrendingProduct />
      <Outfit />
      {/* <Customize /> */}
      <Category />
      <Store />
      <Why />
      <Map />
    </div>
  )
}

export default Home