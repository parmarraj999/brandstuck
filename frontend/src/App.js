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
import Footer from './client-side/pages/footer/footer';
import Shop from './client-side/pages/shop/shop';
import Marquee from './client-side/pages/home/marquee/marquee';
import { useEffect } from 'react';
import MainCart from './client-side/pages/cart-page/mainCart';
import Brands from './client-side/pages/brands/brands';
import ProductDetail from './client-side/pages/product-detail-page/product-detail';
import Auth from './client-side/pages/auth/auth';
import Profile from './client-side/pages/profile/profile';
import { UserCredentialProvider } from './client-side/context/userCredentialProvider';
import { AllProductDataProvider } from './client-side/context/AllProductDataProvider';
import { CartDataProvider } from './client-side/context/cartDataProvider';
import { OrderDataProvider } from './client-side/context/getOrderData';
import Information from './client-side/pages/profile/information/information';
import Address from './client-side/pages/profile/address/address';
import YourOrder from './client-side/pages/profile/yourOrder/yourOrder';
import Payment from './razorpay/payment';
function App() {


  gsap.registerPlugin(ScrollTrigger);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on route change
    }, [pathname]);

    return null;
  }

  // id : rzp_test_tOx8HQJeN0joUt
  // key : 7wCQQM4bctPgljwEp4HX53Ob


  return (
    <OrderDataProvider>
      <CartDataProvider>
        <UserCredentialProvider>
          <AllProductDataProvider>
            <ThemeProvider>
              <div className="App">
                <BrowserRouter>
                  <ScrollToTop />
                  <Nav />
                  {/* <Marquee /> */}
                  <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/cart' element={<MainCart />} />
                    <Route path='/brands' element={<Brands />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/information' element={<Information />} />
                    <Route path='/profile/address' element={<Address />} />
                    <Route path='/profile/orders' element={<YourOrder />} />
                    <Route path='*' element={<h1>404</h1>} />
                    <Route path='/razorpay' element={<Payment/>} />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </div>
            </ThemeProvider>
          </AllProductDataProvider>
        </UserCredentialProvider>
      </CartDataProvider>
    </OrderDataProvider>
  );
}

export default App;
