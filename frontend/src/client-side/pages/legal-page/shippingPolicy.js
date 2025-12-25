// src/pages/ShippingPolicy.jsx
import React from "react";
import "./policyStyle.css";

const ShippingPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Shipping Policy</h1>
      <p>
        At Brandstuck, we aim to deliver your products quickly and efficiently
        across India.
      </p>

      <h2>Shipping Locations</h2>
      <p>We currently ship all over India. International shipping is not available at the moment.</p>

      <h2>Shipping Time</h2>
      <ul>
        <li>Orders are processed within 1–2 business days.</li>
        <li>Delivery takes 3–7 business days depending on your location.</li>
      </ul>

      <h2>Shipping Charges</h2>
      <ul>
        <li>Free shipping on all orders above ₹999.</li>
        <li>A flat fee of ₹49 will be charged on orders below ₹999.</li>
      </ul>

      <h2>Order Tracking</h2>
      <p>
        Once your order is shipped, you will receive an email with tracking details.
      </p>

      <h2>Delays</h2>
      <p>
        While we try to ensure timely delivery, there might be delays due to
        unforeseen circumstances like courier delays or natural events.
      </p>

      <h2>Contact Us</h2>
      <p>
        For shipping-related queries, contact:{" "}
        <a href="mailto:support@brandstuck.in">support@brandstuck.in</a>
      </p>
    </div>
  );
};

export default ShippingPolicy;
