import { useState } from 'react';
import './cart.css'
import { useNavigate } from 'react-router-dom';

export default function MainCart() {

  const [promoCode, setPromoCode] = useState('');

  const items = [
    {
      title: "The Future We Choose",
      author: "Christiana Figueres",
      price: 13.99,
      image: "/api/placeholder/60/80"
    },
    {
      title: "A Natural History of Dragons",
      author: "Marie Brennan",
      price: 9.99,
      image: "/api/placeholder/60/80"
    },
    {
      title: "James",
      author: "Percival Everett",
      price: 14.99,
      image: "/api/placeholder/60/80"
    }
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = 0;
  const total = subtotal;

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.overflow = 'auto';
  });

  return (
    <div className="checkout">
      <div className='checkout-header' >
        <div className='back-btn' onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
        </div>
        <img src='../../../../assets/images/logo.png' />
      </div>
      <div className="checkout-container">
        <div className="order-section">
          <h2 className="section-title">Your order</h2>

          {items.map((item, index) => (
            <div className="order-item" key={index}>
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="item-details">
                <div className="item-title">{item.title}</div>
                <div className="item-author">By {item.author}</div>
              </div>
              <div className="item-price">${item.price.toFixed(2)}</div>
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
          <button className="complete-button">Complete Purchase</button>
          <p className="terms">
            By clicking "Complete Purchase", I accept Terms of Service and have read the Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}