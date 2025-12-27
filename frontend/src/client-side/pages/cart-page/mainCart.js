import { useContext, useEffect, useState } from 'react';
import './cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { cartDataContext } from '../../context/cartDataProvider';
import { UserCredentialContext } from '../../context/userCredentialProvider';
import { handlePayment } from '../../component/paynow';
import { Plus } from 'lucide-react'
import { serverTimestamp } from 'firebase/firestore';
import { applyCoupon } from '../../functions/applyCouponFunction';

export default function MainCart() {
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(150);
  const [message, setMessage] = useState("");

  const { cartItems, removeFromCart } = useContext(cartDataContext);
  const { userCredential, userAddress } = useContext(UserCredentialContext);

  const [choosedAddress, setChoosedAddress] = useState();

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.overflow = 'auto';
  });

  console.log(cartItems, userCredential, choosedAddress)

  
  const userId = window.localStorage.getItem('userId')

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.discountPrice), 0);
  const tax = cartItems?.length > 0 ? 150 : 0;
  const total = subtotal + tax - discountAmount;

  const [finalAmount, setFinalAmount] = useState(total);
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  console.log(appliedCoupon)

  const [showApply, setShowApply] = useState(true)

  const handleApplyCoupon = async () => {
    const res = await applyCoupon(
      couponCode,
      total,
      cartItems.length
    );

    if (!res.success) {
      alert(res.message);
      return;
    }
    if (res.success) {
      setShowApply(false)
    }

    setAppliedCoupon({
      code: couponCode.toUpperCase(),
      ...res.coupon,
    });

    console.log(res.message)
    setMessage(res.message);
    setDiscountAmount(res.discount);
    setFinalAmount(res.finalAmount);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('')
    setShowApply(true)
    setDiscountAmount(0);
    setFinalAmount(total);
  };

  const orderData = {
    product: cartItems,
    userData: userCredential,
    shippingAddress: choosedAddress,
    orderAt: serverTimestamp(),
    coupon: appliedCoupon ? appliedCoupon : []
  }

  return (
    <>
      {
        cartItems.length === 0
          ?
          <div style={{
            width: '100%', height: '100vh', display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
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
            <div>
              <h3></h3>
            </div>
          </div>
          :
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
                    <span>RS.{finalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="promo-section">
                <h3 className="promo-title">Promo code</h3>
                {
                  showApply ?
                    <div className="promo-input">
                      <input
                        type="text"
                        value={couponCode}
                        placeholder="Enter coupon code"
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button className="apply-button" onClick={handleApplyCoupon}>Apply</button>
                    </div>
                    : ''
                }
                {/* {
                  message ?
                    <div className='promo-message' >
                      <p>{message}</p>
                    </div>
                    : ''
                } */}
                {
                  appliedCoupon ?
                    <div className="coupon-applied-card">
                      <div className="coupon-card-left">
                        <div className="icon">🏷️</div>
                        <div>
                          <p className="title">Coupon Applied</p>
                          <p className="subtitle">
                            <b>{couponCode}</b> applied successfully
                          </p>
                        </div>
                      </div>

                      <div className="card-right">
                        <p className="discount">- ₹{discountAmount}</p>
                        <button className="remove-btn" onClick={handleRemoveCoupon}>
                          Remove
                        </button>
                      </div>
                    </div>
                    : ''
                }
              </div>

              <div className='address-choosing-section' >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3>Choose Address</h3>
                  <Link to='/profile/address'>
                    <Plus size={22} color='black' />
                  </Link>
                </div>
                <div className='address-slider' >
                  {
                    userAddress.map((data) => {
                      return (
                        <div className='address-detail-box' onClick={() => setChoosedAddress(data)} style={choosedAddress?.id === data.id ? { border: '1.5px solid #000' } : {}} key={data.id}>
                          <h2>{data.addressType}</h2>
                          <p>{data.houseDetails}</p>
                          <p>{data.city}, {data.state}</p>
                          <p>Pin Code - {data.pincode}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="complete-section">
                {
                  choosedAddress && total !== 0 ?
                    <button className="complete-button" onClick={() => handlePayment(total, orderData, navigate, userId)}>
                      Complete Purchase
                    </button>
                    : ''
                }
                {/* <PayNow/> */}

                <p className="terms">
                  By clicking "Complete Purchase", I accept Terms of Service and have
                  read the Privacy Policy.
                </p>
              </div>
            </div>
          </div>
      }
    </>

  );
}