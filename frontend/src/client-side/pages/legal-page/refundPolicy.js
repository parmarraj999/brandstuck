// src/pages/RefundPolicy.jsx
import React from "react";
import "./policyStyle.css";

const RefundPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Refund & Return Policy</h1>
      <p>
        At Brandstuck, we strive to ensure customer satisfaction with every
        purchase. If you are not entirely satisfied with your purchase, we're
        here to help.
      </p>

      <h2>Returns</h2>
      <p>
        You have 7 days to return an item from the date you received it. To be
        eligible for a return:
      </p>
      <ul>
        <li>Item must be unused and in the same condition as received.</li>
        <li>It must be in the original packaging with tags intact.</li>
        <li>Invoice must be included with the return.</li>
      </ul>

      <h2>Refunds</h2>
      <p>
        Once we receive your item, we will inspect it and notify you of the
        status. If approved, we will initiate a refund to your original payment
        method within 7–10 business days.
      </p>

      <h2>Non-refundable items</h2>
      <ul>
        <li>Items on sale</li>
        <li>Gift cards</li>
        <li>Undergarments</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have any questions, contact us at{" "}
        <a href="mailto:support@brandstuck.in">support@brandstuck.in</a>
      </p>
    </div>
  );
};

export default RefundPolicy;
