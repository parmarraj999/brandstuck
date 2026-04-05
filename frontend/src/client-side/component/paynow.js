// import { createOrder, verifyPayment } from "../../api/paymentApi";

import { collection, doc, setDoc, writeBatch, query, getDocs } from "firebase/firestore";
import { createOrder, verifyPayment } from "../../api/paymentApi";
import { db } from "../../firebase/firebaseConfig";

export const handlePayment = async (amount, orderData, navigate, setLoading, preCreatedOrder = null) => {
  setLoading(true);

  function generate8DigitNumber() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }
  const orderId = generate8DigitNumber();

  let order = preCreatedOrder;

  if (!order) {
    try {
      const response = await createOrder(`${amount}`);
      order = response.data;
    } catch (error) {
      console.log("Error creating order:", error);
      setLoading(false);
      alert("Failed to initiate payment. Please try again.");
      return;
    }
  }

  const getRefundEligibleTill = () => {
    const now = new Date();
    const refundTill = new Date(now);

    refundTill.setDate(refundTill.getDate() + 5);

    return refundTill;
  };

  const refundEligibleTill = getRefundEligibleTill();

  const options = {
    key: "rzp_test_RvsB2MOcwdhZtz",
    amount: order.amount,
    currency: "INR",
    name: "Brandstuck",
    description: "Brandstuck Payment Successfully",
    order_id: order.id,


    handler: async (response) => {
      // console.log(response)
      // setLoading(true)
      const verify = await verifyPayment(response);
      if (verify.data.success) {
        // adding data to firestore
        try {
          const docRef = doc(collection(db, 'Orders'));

          // Start a batch for atomicity
          const batch = writeBatch(db);

          // 1. Add order to Orders collection
          batch.set(docRef, {
            ...orderData,
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            trackingId: 'not available',
            order_status: 'Pending',
            estimate_date: 'not available',
            amount: amount,
            refund_eligible_date: refundEligibleTill,
          });

          // 2. Mark products as sold in All-Product collection
          if (orderData.product && orderData.product.length > 0) {
            orderData.product.forEach((product) => {
              const productId = product.id || product.productId;
              if (productId) {
                const productRef = doc(db, "All-Product", productId);
                batch.update(productRef, { status: "sold" });
              }
            });
          }

          // 3. Clear user's cart
          const userId = orderData.userData?.userId || window.localStorage.getItem('userId');
          if (userId) {
            const cartRef = collection(db, 'users', userId, 'cart-products');
            const cartSnapshot = await getDocs(cartRef);
            cartSnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
          }

          // Commit all changes
          await batch.commit();

          document.body.style.overflow = 'auto'; // Ensure scrollable
          setLoading(false);
          navigate('/profile/orders');
        } catch (error) {
          console.log('Error processing successful order:', error)
          setLoading(false);
          document.body.style.overflow = 'auto';
        }
        // setLoading(false)
        // alert("Payment Successful ✅"); // Removed alert as requested
      } else {
        setLoading(false);
        alert("Payment Failed ❌");
      }
    },
    modal: {
      ondismiss: function () {
        setLoading(false);
        document.body.style.overflow = 'auto';
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const PayNow = () => {

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PayNow;
