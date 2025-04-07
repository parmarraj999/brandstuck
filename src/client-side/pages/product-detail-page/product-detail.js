import React from 'react'
import './product-detail.css'
import { useParams } from 'react-router-dom'
import CartSmall from '../../component/cartSmall/cartSmall'

function ProductDetail() {

  const { id } = useParams()
  console.log(id)

  return (
    <div className='product-detail-container'>
      {/* <div className='product-header' >
        <div className='back-btn'>
          <svg style={{ width: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
        </div>
  
        <img src='../../../../assets/images/logo.png' />
        <div className='product-header-icons' >
          <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
          </div>
          <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
          </div>
          <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
          </div>
        </div>
      </div> */}
      <div className='product-details-wrapper' >
        <div className='product-image' >
          <img src='https://i.pinimg.com/474x/fc/27/17/fc2717f7cbcb1fd6816deeed62543133.jpg' />
          <div className='more-img' >
            <img src='https://i.pinimg.com/474x/0e/35/84/0e3584f6af2ae3b3cec0310b1ec21fce.jpg' />
            <img src='https://i.pinimg.com/474x/2e/60/9e/2e609ef0835cdb802c4fd218558d6e87.jpg' />
            <img src='https://i.pinimg.com/474x/96/82/68/96826886745613968306bdbcd4078238.jpg' />
            <img src='https://i.pinimg.com/474x/85/74/82/857482081bdaa89b0c4b19d6de63b530.jpg' />
          </div>
        </div>
        <div className='product-detail' >
          <div className='product-name' >
            <h1>plain white t-shirt // us polo</h1>
            <h2>t-shirt</h2>
          </div>
          <div className='product-price' >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "30px" }} >
                <h3>rs.1990</h3>
                <h4>rs.1500</h4>
              </div>
              <p>tax included</p>
            </div>
            <h5>50% off</h5>
          </div>
          <div className='add-to-cart-box-container' >
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
              <h2>choose size</h2>
              <h4>[size chart]</h4>
            </div>
            <div className='size-box-container' >
              <div className='size-box' >s</div>
              <div className='size-box' >m</div>
              <div className='size-box' >l</div>
              <div className='size-box' >xl</div>
              <div className='size-box' >xxl</div>
            </div>
            <button>Add to cart</button>
            <p>NOTE : YOU CAN APPLY COUPON CODE WHILE CONFIrMING ORDER IN CART </p>
          </div>
          <div className='color-show' >
          <h2>colors</h2>
          <div className='colors-box' >
            <div className='color-box' ></div>
            <div className='color-box' ></div>
            <div className='color-box' ></div>
          </div>
          </div>
          <div className='shipping-details' >
            <h2>shipping</h2>
            <p>Your order will be dispatched within 24-48 hours</p>
            <p>After dispatch, it takes about</p>
            <li>4 to 7 working days for the rest of India.</li>
            <p>We ship your order from Narsinghpur, Madhya Pradesh.</p>
            <h2>delivery under 30 min in Narsinghpur,</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail