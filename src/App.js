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
import Shop from './client-side/pages/shop/shop';
import Marquee from './client-side/pages/home/marquee/marquee';
import { useEffect } from 'react';
import MainCart from './client-side/pages/cart-page/mainCart';
import Brands from './client-side/pages/brands/brands';
import ProductDetail from './client-side/pages/product-detail-page/product-detail';
import Auth from './client-side/pages/auth/auth';
import { AllProductDataProvider } from './context/AllProductDataProvider';
import Profile from './client-side/pages/profile/profile';
import { collection, doc, getDocs, query } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';

function App() {


  gsap.registerPlugin(ScrollTrigger);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on route change
    }, [pathname]);

    return null;
  }

  // const userId = 'user123'
  // useEffect(() => {
  //   const fetchOrders = async () => {

  //     try {
  //       // 1. Create a reference to the user's document.
  //       const userDocRef = doc(db, 'users', userId);

  //       // 2. Create a reference to the 'orders' subcollection within the user's document.
  //       const ordersCollectionRef = collection(userDocRef, 'orders');

  //       // 3. Create a query to get all documents from the 'orders' subcollection
  //       const q = query(ordersCollectionRef);

  //       // 4. Get the documents using getDocs()
  //       const querySnapshot = await getDocs(q);

  //       // 5. Map the documents to the Order interface
  //       const fetchedOrders = querySnapshot.docs.map(doc => {
  //         const data = doc.data();
  //         // Firestore doesn't store dates as Date objects, so we need to convert it.
  //         const orderDate = data.orderDate ? new Date(data.orderDate.seconds * 1000) : new Date();
  //         return {
  //           id: doc.id,
  //           products: data.products,
  //           orderDate: orderDate,
  //           totalAmount: data.totalAmount,
  //           orderStatus: data.orderStatus,
  //           // Add other order properties as needed
  //         };
  //       });
  //       console.log('Fetched orders:', fetchedOrders);

  //     } catch (err) {
  //       console.error("Error fetching orders: ", err);
  //     }
  //   };

  //   fetchOrders();
  // }, [userId]);

  return (
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
              <Route path='*' element={<h1>404</h1>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AllProductDataProvider>
  );
}

export default App;
