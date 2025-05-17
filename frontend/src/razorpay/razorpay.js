import React, { useState } from 'react'
import axios from 'axios'

function Razorpay() {

    const [formData,setFormData] = useState()

    const loadRazorpayScripts = () => {
        return new Promise((resolve, reject) => {
            const razorpayScript = document.createElement('script');
            razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
            razorpayScript.onload = () => resolve(true);
            razorpayScript.onerror = () => reject('Failed to load Razorpay SDK.');
            document.body.appendChild(razorpayScript);

            const axiosScript = document.createElement('script');
            axiosScript.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
            document.body.appendChild(axiosScript);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            // price: Cookies.get("price"),
            // doctor: Cookies.get("doctor"),
        }));

        // onClose();

        try {
            const res = await loadRazorpayScripts();
            if (!res) {
                alert('Failed to load Razorpay SDK. Check your internet connection.');
                return;
            }

            const response = await axios.post('http://localhost:5000/create/orderId', formData);
            const { amount, currency, id } = response.data;

            const options = {
                key: '7wCQQM4bctPgljwEp4HX53Ob',
                amount: amount,
                currency: currency,
                name: "CarespaceX",
                description: "Messenger of Health",
                order_id: id,
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post('http://localhost:5000/create/orderId/verify', {
                            razorpayOrderId: '02023403',
                            razorpayPaymentId: '2323402384023',
                            // razorpayOrderId: response.razorpay_order_id,
                            // razorpayPaymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                            formData
                        });
                        alert('Payment verified successfully');
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: formData.patientName,
                    email: "ABC@gmail.com",
                    contact: "1111111111"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#000099"
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert('Payment Failed');
            });
            rzp1.open();

        } catch (error) {
            console.error('Error during payment creation:', error);
            alert('Error during payment creation. Please try again.');
        }
    }
    return (
        <div> 
            <button onClick={handleSubmit}>pay</button>
        </div>
    )
}

export default Razorpay