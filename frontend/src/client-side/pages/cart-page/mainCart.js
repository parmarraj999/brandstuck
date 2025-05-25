import { useContext, useEffect, useState } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { cartDataContext } from '../../context/cartDataProvider';
import axios from 'axios';

export default function MainCart() {
  const [promoCode, setPromoCode] = useState('');
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  const { cartItems, removeFromCart } = useContext(cartDataContext);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  // Calculate subtotal, tax, total from cartItems
  const subtotal = cartItems.reduce((sum, item) => sum + item.discountPrice, 0);
  const tax = 0;
  const total = subtotal + tax;

  // Load Razorpay SDK once on mount
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().then((res) => {
      setIsRazorpayLoaded(res);
      if (!res) {
        alert('Failed to load Razorpay SDK. Check your internet connection.');
      }
    });
  }, []);

  const handlePayment = async () => {
    if (!isRazorpayLoaded) {
      alert('Razorpay SDK not loaded yet. Please try again.');
      return;
    }

    try {
      // Razorpay expects amount in paise (multiply by 100)
      const response = await axios.post('http://localhost:8080/payment/create/orderId', { amount: total * 100 });

      const { amount, currency, id: order_id } = response.data;

      const options = {
        key: '7wCQQM4bctPgljwEp4HX53Ob',
        amount: amount,
        currency: currency,
        name: "CarespaceX",
        description: "Messenger of Health",
        order_id: order_id,
        handler: async function (response) {
          try {
            await axios.post('http://localhost:8080/payment/api/payment/verify/bed', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              total,
            });
            alert('Payment verified successfully');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: "diulhdiu",
          email: "ABC@gmail.com",
          contact: "1111111111",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000099",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        alert('Payment Failed');
      });
      rzp.open();

    } catch (error) {
      console.error('Error during payment creation:', error);
      alert('Error during payment creation. Please try again.');
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
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (0.00%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="promo-section">
          <h3 className="promo-title">Promo code</h3>
          <div className="promo-input">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="apply-button">Apply</button>
          </div>
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
