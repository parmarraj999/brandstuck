import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './client-side/pages/home/main';
import { ThemeProvider } from './client-side/context/ThemeContext';
import './client-side/styles/theme/theme.css'
import './client-side/styles/typography/typography.css'
import './client-side/styles/utility/utility.css'
import Nav from './client-side/pages/nav/nav';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './client-side/pages/footer/footer';
import NavMen from './client-side/pages/nav/nav-menu';
import Shop from './client-side/pages/shop/shop';
import Marquee from './client-side/pages/home/marquee/marquee';

function App() {

  gsap.registerPlugin(ScrollTrigger);

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Marquee/>
          {/* <NavMen/> */}
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/shop' element={<Shop />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
