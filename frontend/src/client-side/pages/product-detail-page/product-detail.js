import React from 'react'
import './product-detail.css'
import { useParams } from 'react-router-dom'
import CartSmall from '../../component/cartSmall/cartSmall'
import SmallNav from '../nav/smallNav'
import Footer from '../footer/footer'

function ProductDetail() {

  const { id } = useParams()
  console.log(id)

  return (
    <>

    <div className='product-detail-container'>
      <SmallNav/>
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
      <Footer/>
    </div>
    </>
  )
}

export default ProductDetail