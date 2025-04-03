import { BrowserRouter, Route, Router, Routes, UNSAFE_useScrollRestoration, useLocation } from 'react-router-dom';
import './App.css';
import Main from './client-side/pages/home/main';
import { ThemeProvider } from './client-side/context/ThemeContext';
import './client-side/styles/theme/theme.css'
import './client-side/styles/typography/typography.css'
import './client-side/styles/utility/utility.css'
import Nav from './client-side/pages/nav/nav';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Shery from "sheryjs";
import Footer from './client-side/pages/footer/footer';
import NavMen from './client-side/pages/nav/nav-menu';
import Shop from './client-side/pages/shop/shop';
import Marquee from './client-side/pages/home/marquee/marquee';
import { useEffect } from 'react';
import MainCart from './client-side/pages/cart-page/mainCart';
import Brands from './client-side/pages/brands/brands';


// import { useScrollRestoration } from 'react-router-dom';

function App() {


  gsap.registerPlugin(ScrollTrigger);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on route change
    }, [pathname]);

    return null;
  }

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
        <ScrollToTop/>
          <Nav />
          <Marquee />
          {/* <NavMen/> */}
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<MainCart/>} />
            <Route path='/brands' element={<Brands/>} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
