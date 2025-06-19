import { useContext, useEffect, useState } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { cartDataContext } from '../../context/cartDataProvider';
import axios from 'axios';
import { AllProductDataContext } from '../../context/AllProductDataProvider';
import { makePayment } from '../../functions/makePayment';

export default function MainCart() {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(150);
  const [message, setMessage] = useState("");

  const { cartItems, removeFromCart } = useContext(cartDataContext);
  const { coupons } = useContext(AllProductDataContext)

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.overflow = 'auto';
  });

  const handlePayment = async (e) => {
    console.log(cartItems)
    makePayment(total, cartItems)
  }

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.discountPrice), 0);
  const tax = cartItems.leng > 0 ? 150 : 0;
  const total = subtotal + tax - discountAmount;

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.couponName.toLowerCase() === couponCode.toLowerCase());

    if (coupon) {
      let discountValue = 0;

      // if discount percentage available
      if (coupon.discount > 0) {
        discountValue = Math.round((subtotal * coupon.discount) / 100);
        setMessage(`${coupon.discount}% discount applied! You saved ₹${discountValue}`);
      }
      // else use fixed amount
      else if (coupon.amount > 0) {
        discountValue = coupon.amount;
        setMessage(`₹${coupon.amount} discount applied!`);
      }
      else {
        setMessage("This coupon has no discount.");
      }

      setDiscountAmount(discountValue);
    } else {
      setMessage("Invalid coupon code!");
      setDiscountAmount(0);
      setShippingCharge(150); // reset shipping
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="back-btn" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left-icon lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>
        <img src="../../../../assets/images/logo.png" alt="Logo" />
      </div>
      <div className="checkout-container">
        <div className="order-section">
          <h2 className="section-title">Your order</h2>

          {cartItems.map((item, index) => (
            <div className="order-item" key={index}>
              <div className="item-image">
                <img src={item.imageUrls[0].imageUrl} alt={item.name} />
              </div>
              <div className="item-details">
                <div className="item-title">{item.name}</div>
                <div className="item-author">{item.brand}</div>
                <div
                  className="delete-btn"
                  style={{ marginTop: '.2rem' }}
                  onClick={() => removeFromCart(item.docId)}
                >
                  <svg
                    style={{ width: '15px' }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                  </svg>
                </div>
              </div>
              <div className="item-price">rs.{item.discountPrice}</div>
            </div>
          ))}

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>RS.{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>RS.{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>RS.{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="promo-section">
          <h3 className="promo-title">Promo code</h3>
          <div className="promo-input">
            <input
              type="text"
              value={couponCode}
              placeholder="Enter coupon code"
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="apply-button" onClick={applyCoupon}>Apply</button>
          </div>
          {
            message ?
              <div className='promo-message' >
                <p>{message}</p>
              </div>
              : ''
          }
        </div>

        <div className="complete-section">
          <button className="complete-button" onClick={handlePayment}>
            Complete Purchase
          </button>

          <p className="terms">
            By clicking "Complete Purchase", I accept Terms of Service and have
            read the Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}